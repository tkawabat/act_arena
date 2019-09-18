import Moment from 'moment';
import { observable, computed, action } from 'mobx';
import { IMessage, Time } from 'react-native-gifted-chat';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';
import Navigator from '../lib/Navigator';

import ConfigStore from './ConfigStore';
import UserStore, { User } from './UserStore';
import SkywayStore from './SkywayStore';
import OverlayMessageStore from '../store/OverlayMessageStore';

interface Characters {
    name: string
    gender: number
    user: string
    userName: string
}
interface ArenaUser {
    name: string
    gender: C.Gender
    iconUrl: string
    state: C.ArenaUserState
}

class ArenaStore {
    private db:Firebase.firestore.CollectionReference;
    private ref:Firebase.firestore.DocumentReference;
    private unsubscribe:Function;
    private userRef:Firebase.firestore.CollectionReference;
    private userUnsubscribe:Function;
    private chatRef:Firebase.firestore.CollectionReference;
    private chatUnsubscribe:Function;
    private tick:NodeJS.Timeout;

    // Arena
    private id :number;
    @observable scenario:string;
    @observable arenaState:C.ArenaState = null;
    @observable time:string;
    @observable endAt:Moment.Moment;
    @observable users:{ [id:string]:ArenaUser} = {};
    @observable message:string = null;

    // Scenario
    @observable title:string;
    @observable agreementUrl:string;
    @observable agreementScroll:number;
    @observable scenarioUrl:string;
    @observable startText:string;
    @observable endText:string;
    @observable characters:Array<Characters>;

    // Chat
    @observable messages:Array<IMessage> = new Array<IMessage>();
    @observable latestReadMessage:IMessage;

    // private state
    @observable agreementState:C.AgreementState;
    private _tab:C.ArenaTab;
    get tab() { return this._tab }
    set tab(tab:C.ArenaTab) { this._tab = tab }

    @observable modal:boolean;

    @computed get isReadAgreement() {
        return this.agreementState !== C.AgreementState.NONE;
    }

    @computed get isAgree() {
        return this.agreementState === C.AgreementState.AGREE;
    }

    @computed get canLeave() {
        if (!this.users[UserStore.id]) return true;
        return this.users[UserStore.id].state !== C.ArenaUserState.ACTOR;
    }

    @computed get unreadNumber() {
        if (!this.latestReadMessage) return 0;

        let i = 0;
        for (i = 0; i < this.messages.length; i++) {
            if (this.latestReadMessage._id === this.messages[i]._id) break;
        }
        return i;
    }

    constructor() {
        this.db = Firebase.firestore().collection('Arena');
    }

    @action setMessages = (messages:Array<IMessage>) => {
        this.messages = messages;
    }

    @action readMessage = () => {
        this.latestReadMessage = this.messages[0];
    }

    @action setModal = (modal:boolean) => {
        this.modal = modal;
    }

    @action public setAgreement = (agreement:C.AgreementState) => {
        this.agreementState = agreement;
    }

    @action
    private arenaUpdated = (snapshot :Firebase.firestore.QuerySnapshot) => {
        const data = snapshot.docs[0].data();

        this.dealArenaStateTransition(this.arenaState, data.state);
        this.dealArenaMessageTransition(this.message, data.message);

        this.arenaState = data.state;
        this.endAt = Moment.unix(data.endAt.seconds);
        this.title = data.title;
        this.agreementUrl = data.agreementUrl;
        this.agreementScroll = data.agreementScroll;
        this.scenarioUrl = data.scenarioUrl;
        this.startText = data.startText;
        this.endText = data.endText;
        this.message = data.message;
        this.characters = data.characters;

        for (const character of this.characters) {
            if (character.user !== UserStore.id) continue;
            if (SkywayStore.speakState === C.SpeakState.DISABLED) {
                SkywayStore.setSpeakState(C.SpeakState.MUTE);
            }
            break;
        }

        clearInterval(this.tick);
        this.tick = setInterval(() => {
            const now = Moment();
            const diff = this.endAt.diff(now, 'seconds');
            this.time = diff > 0 ? diff.toString() : '---';
            if (diff <= 0) clearInterval(this.tick);
        }, 1000);
    }

    private usersUpdated = (snapshot :Firebase.firestore.QuerySnapshot) => {
        const users = {};
        snapshot.docs.map((doc) => {
            users[doc.id] = doc.data() as ArenaUser;
        });

        this.users = users;

        // 退室チェック
        if (!this.users[UserStore.id]) {
            OverlayMessageStore.start('接続切れのため退室します');
            setTimeout(() => this.leave(), 2000);
            return;
        }
    }

    private chatUpdated = (snapshot: Firebase.firestore.QuerySnapshot) => {
        const messages = snapshot.docs.map((doc) => {
            const data = doc.data();
            const ts = data.createdAt as Firebase.firestore.Timestamp;
            data.createdAt = ts.toDate();
            return data as IMessage;
        });
        this.setMessages(messages);
        if (this.tab === C.ArenaTab.CHAT) this.readMessage();
    }

    private dealArenaStateTransition = (before:C.ArenaState, after:C.ArenaState) :void => {
        if (before === null || before === after) return;

        switch (after) {
            case C.ArenaState.WAIT:
                this.agreementState = C.AgreementState.NONE;
                this.setModal(false);
                break;
            case C.ArenaState.CONFIRM:
                this.setModal(true);
                break;
            case C.ArenaState.CHECK:
                break;
            case C.ArenaState.ACT:
                break;
        } 
    }

    private dealArenaMessageTransition = (before:string, after:string) :void => {
        if (before === null || before === after) return;

        if (after !== '') {
            OverlayMessageStore.start(after);
        }
    }

    private asyncSetRoomUser = async () :Promise<void> => {
        return this.userRef.doc(UserStore.id).set({
            name: UserStore.name,
            gender: UserStore.gender,
            state: C.ArenaUserState.LISTNER,
        })
        .catch((error) => Amplitude.error('ArenaStore join add user', error))
        ;
    }

    private observe = () => {
        this.unsubscribe = this.db.where('id', '==', this.id).onSnapshot((snapshot) => {
            this.arenaUpdated(snapshot);
            this.readMessage();
        });

        this.userUnsubscribe = this.userRef.onSnapshot(this.usersUpdated);
        this.chatUnsubscribe = this.chatRef.orderBy('createdAt', 'desc').onSnapshot(this.chatUpdated);
    }

    private stopObserve = () => {
        this.unsubscribe();
        this.userUnsubscribe();
        this.chatUnsubscribe();
    }

    public get = async (id:number) :Promise<void> => {
        return this.db
            .where('id', '==', id)
            .get()
            .then((snapshot :Firebase.firestore.QuerySnapshot) => {
                if (snapshot.size < 1) {
                    Amplitude.error('ArenaStore get', {id:id});
                    return;
                }
                this.ref = snapshot.docs[0].ref;
                this.userRef = this.ref.collection('RoomUser');
                this.chatRef = this.ref.collection('Chat');
                this.arenaUpdated(snapshot);
            })
            .catch((error) => Amplitude.error('UserStore get', error))
            ;
    }

    public update = () => {
        const updatedAt = Moment().toDate();
        this.ref.update({
            updatedAt
        })
        .catch((err) => {console.log(err)})
    }

    @action
    public join = async (id:number) => {
        this.id = id;
        this.arenaState = null;
        this.agreementState = C.AgreementState.NONE;
        this.tab = C.ArenaTab.SCENARIO;
        this.setModal(false);
        SkywayStore.join('arena'+this.id);

        await this.get(this.id);

        const p = [];
        p.push(this.asyncSetRoomUser());
        p.push(UserStore.asyncSetRoom(this.ref.id));
        //p.push(UserStore.asyncSetConnect(true));
        await Promise.all(p);

        this.observe();

        UserStore.observeConnectionChange();
        Navigator.navigate('Arena', null);
    }

    public leave = () => {
        SkywayStore.leave();
        this.stopObserve();
        UserStore.stopObserveConnectionChange();
        
        UserStore.asyncSetConnect(false);
        clearInterval(this.tick);
        this.userRef.doc(UserStore.id).delete()
            .catch((error) => Amplitude.error('ArenaStore leave', error))
        ;

        Navigator.back();
    }

    public entry = (state:C.ArenaUserState) => {
        if (!this.users[UserStore.id]) return;

        ConfigStore.load(true);
        setTimeout(() => {
            this.userRef.doc(UserStore.id).update({
                state: state
            })
            .then(() => ConfigStore.load(false))
            .catch((error) => Amplitude.error('ArenaStore entry', error))
            ;
        }, 1000);
    }

    @action
    public readAgreement = () => {
        if (this.agreementState === C.AgreementState.NONE) {
            this.agreementState = C.AgreementState.READ;
        }
    }

    public addChat = (messages:Array<IMessage>) => {
        messages.forEach((message) => {
            this.chatRef.add(message);
        });
    }

}


export default new ArenaStore();