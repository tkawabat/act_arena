import Moment from 'moment';
import { observable, computed, action } from 'mobx';
import { IMessage, Time } from 'react-native-gifted-chat';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';
import Navigator from '../lib/Navigator';

import LoadStore from './LoadStore';
import UserStore, { User } from './UserStore';
import SkywayStore from './SkywayStore';
import OverlayMessageStore from '../store/OverlayMessageStore';

interface Charactors {
    name: string
    gender: number
    user: string
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
    private userRef:Firebase.firestore.CollectionReference;
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

    // Scenario
    @observable title:string;
    @observable agreementUrl:string;
    @observable agreementScroll:number;
    @observable scenarioUrl:string;
    @observable startText:string;
    @observable endText:string;
    @observable characters:Array<Charactors>;

    // Chat
    @observable messages:Array<IMessage> = new Array<IMessage>();
    @observable readMessage:IMessage;

    // private state
    @observable agreementState:C.AgreementState;
    private _tab:C.ArenaTab;
    get tab() { return this._tab }
    set tab(tab:C.ArenaTab) { this._tab = tab }

    @computed get isReadAgreement() {
        return this.agreementState != C.AgreementState.NONE;
    }

    @computed get isAgree() {
        return this.agreementState != C.AgreementState.AGREE;
    }

    @computed get canLeave() {
        if (!this.users[UserStore.id]) return true;
        return this.users[UserStore.id].state !== C.ArenaUserState.ACTOR;
    }

    @computed get unreadNumber() {
        const result = this.messages.length;
        if (!this.readMessage) return result;

        let i = 0;
        for (i = 0; i < this.messages.length; i++) {
            if (this.readMessage._id === this.messages[i]._id) break;
        }
        return i;
    }

    @action setMessages = (messages) => {
        this.messages = messages;
    }

    @action read = () => {
        this.readMessage = this.messages[0];
    }

    constructor() {
        this.db = Firebase.firestore().collection('Arena');
    }

    private onArenaUpdate = (snapshot :Firebase.firestore.QuerySnapshot) => {
        const data = snapshot.docs[0].data();

        this.dealArenaStateTransition(this.arenaState, data.state);
        this.arenaState = data.state;
        this.endAt = Moment.unix(data.endAt.seconds);
        this.title = data.title;
        this.agreementUrl = data.agreementUrl;
        this.agreementScroll = data.agreementScroll;
        this.scenarioUrl = data.scenarioUrl;
        this.startText = data.startText;
        this.endText = data.endText;
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

    private onUserUpdate = (snapshot :Firebase.firestore.QuerySnapshot) => {
        const users = {};
        snapshot.docs.map((doc) => {
            users[doc.id] = doc.data() as ArenaUser;
        });
        this.users = users;
    }

    private onChatUpdate = (snapshot: Firebase.firestore.QuerySnapshot) => {
        const messages = snapshot.docs.map((doc) => {
            const data = doc.data();
            const ts = data.createdAt as Firebase.firestore.Timestamp;
            data.createdAt = ts.toDate();
            return data as IMessage;
        });
        this.setMessages(messages);
        if (this.tab === C.ArenaTab.CHAT) this.read();
    }

    private dealArenaStateTransition = (before:C.ArenaState, after:C.ArenaState) :void => {
        if (before === null || before === after) return;

        if (after === C.ArenaState.CONFIRM) {
            OverlayMessageStore.start('マッチング成功');
        }

        if (after === C.ArenaState.WAIT) {
            this.agreementState = C.AgreementState.NONE;
        }
    }

    // private onUserUpdate = (snapshot :firebase.firestore.QuerySnapshot) => {
    //     const users = snapshot.docs.map((doc) => {
    //         const data = doc.data();
    //         return data;
    //       });
    //       this.users = users;
    // }

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
                this.chatUnsubscribe = this.userRef.onSnapshot(this.onUserUpdate);
                this.chatRef = this.ref.collection('Chat');
                this.chatUnsubscribe = this.chatRef.orderBy('createdAt', 'desc').onSnapshot(this.onChatUpdate);
                this.onArenaUpdate(snapshot);
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

    public join = async (id:number) => {
        this.id = id;
        this.arenaState = null;
        this.agreementState = C.AgreementState.NONE;
        this.tab = C.ArenaTab.SCENARIO;

        SkywayStore.join('arena'+this.id);
        await this.get(this.id);
        await this.userRef.doc(UserStore.id).set({
            name: UserStore.name
            , gender: UserStore.gender
            , state: C.ArenaUserState.LISTNER
        })
        .catch((error) => Amplitude.error('ArenaStore join add user', error))
        ;
        UserStore.setRoom(this.ref.id);

        this.db.where('id', '==', this.id).onSnapshot((snapshot) => {
            this.onArenaUpdate(snapshot);
            this.read();
        });

        Navigator.navigate('Arena', null);
    }

    public leave = () => {
        clearInterval(this.tick);
        SkywayStore.leave();
        this.userRef.doc(UserStore.id).delete()
            .catch((error) => Amplitude.error('ArenaStore leave', error))
            ;
        this.chatUnsubscribe();

        Navigator.back();
    }

    public entry = (state:C.ArenaUserState) => {
        if (!this.users[UserStore.id]) return;

        LoadStore.load(true);
        setTimeout(() => {
            this.userRef.doc(UserStore.id).update({
                state: state
            })
            .then(() => LoadStore.load(false))
            .catch((error) => Amplitude.error('ArenaStore entry', error))
            ;
        }, 1000);
    }

    public readAgreement = () => {
        if (this.agreementState === C.AgreementState.NONE) {
            this.agreementState = C.AgreementState.READ;
        }
    }

    public agree = () => {
        this.agreementState = C.AgreementState.AGREE;
    }

    public addChat = (messages:Array<IMessage>) => {
        messages.forEach((message) => {
            this.chatRef.add(message);
        });
    }

}


export default new ArenaStore();