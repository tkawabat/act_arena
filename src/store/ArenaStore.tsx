import Moment from 'moment';
import { Alert, } from 'react-native';
import { observable, computed, action } from 'mobx';
import { IMessage } from 'react-native-gifted-chat';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';
import Navigator from '../lib/Navigator';

import ConfigStore from './ConfigStore';
import UserStore, { User } from './UserStore';
import SkywayStore from './SkywayStore';
import SoundStore from './SoundStore';
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
    private tickTimeout:NodeJS.Timeout;

    // Arena
    private id :number = null; // entered arena
    @observable scenario:string;
    @observable arenaState:C.ArenaState = null;
    @observable time:number;
    @observable endAt:Moment.Moment;
    @observable users:{ [id:string]:ArenaUser} = {};
    @observable overlayMessage:string = null;

    // Scenario
    @observable title:string;
    @observable agreementUrl:string;
    @observable agreementScroll:number;
    @observable scenarioUrl:string;
    @observable startText:string;
    @observable endText:string;
    @observable characters:Array<Characters>;

    // Chat
    @observable _messages:Array<IMessage> = new Array<IMessage>();
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

    @computed get userState() {
        if (!this.users[UserStore.id]) return C.ArenaUserState.LISTNER;
        return this.users[UserStore.id].state;
    }

    @computed get canLeave() {
        if (!this.users[UserStore.id]) return true;
        return this.users[UserStore.id].state !== C.ArenaUserState.ACTOR;
    }

    @computed get messages() {
        return this._messages.filter((v:any, i) => {
            if (v.reporter && v.reporter.indexOf(UserStore.id) !== -1) return false;
            if (UserStore.ngList && UserStore.ngList.indexOf(v.user._id) !== -1) return false;
            return true;
        });
    }

    set messages(messages:Array<IMessage>) {
        this._messages = messages;
    }

    @computed get unreadNumber() {
        if (!this.latestReadMessage) return 0;

        let i = 0;
        for (i = 0; i < this.messages.length; i++) {
            if (this.latestReadMessage._id === this.messages[i]._id) break;
        }
        return i;
    }

    @computed get userNum() {
        if (!this.users) return 0;
        return Object.keys(this.users).length;
    }

    constructor() {
        this.db = Firebase.firestore().collection('Arena');

        this.get(0)
            .then(() => {
                this.userRef.get().then(this.usersUpdated);
                this.userUnsubscribe = this.userRef.onSnapshot(this.usersUpdated);
                ConfigStore.setInitLoadComplete('arena');
            })
        ;
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
    private tick = () => {
        // stateと残り時間の計算
        let diff = this.endAt.diff(Moment(), 'seconds');
        let state:C.ArenaState;
        const stateList = [
            C.ArenaState.WAIT,
            C.ArenaState.ACT,
            C.ArenaState.CHECK,
            C.ArenaState.CONFIRM,
        ];
        for (state of stateList) {
            // 遅延対策のため全stateの合計時間以上になることがあるので、マイクチェックなら終了させる
            if (state === C.ArenaState.CONFIRM) break;
            if (diff <= C.ArenaStateTime[state]) break;
            diff -= C.ArenaStateTime[state];
        }

        this.dealArenaStateTransition(this.arenaState, state);
        this.arenaState = state;
        this.time = diff;
        
        if (diff <= 0) clearInterval(this.tickTimeout);
    }

    @action
    private arenaUpdated = (snapshot :Firebase.firestore.DocumentSnapshot) => {
        const data = snapshot.data();

        //this.dealArenaStateTransition(this.arenaState, data.state);
        this.dealArenaMessageTransition(this.overlayMessage, data.message);

        //this.arenaState = data.state;
        this.endAt = Moment.unix(data.endAt.seconds);
        this.title = data.title;
        this.agreementUrl = data.agreementUrl;
        this.agreementScroll = data.agreementScroll;
        this.scenarioUrl = data.scenarioUrl;
        this.startText = data.startText;
        this.endText = data.endText;
        this.overlayMessage = data.message;
        this.characters = data.characters;

        for (const character of this.characters) {
            if (character.user !== UserStore.id) continue;

            Amplitude.info('ArenaBeActor', null);
            if (SkywayStore.speakState === C.SpeakState.DISABLED) {
                SkywayStore.setSpeakState(C.SpeakState.MUTE);
            }
            break;
        }

        clearInterval(this.tickTimeout);
        this.tickTimeout = setInterval(this.tick, 1000);
    }

    private usersUpdated = (snapshot :Firebase.firestore.QuerySnapshot) => {
        const users = {};
        snapshot.docs.map((doc) => {
            users[doc.id] = doc.data() as ArenaUser;
        });

        // 退室チェック
        if (this.id !== null && !users[UserStore.id]) {
            OverlayMessageStore.start('接続切れのため退室します');
            setTimeout(() => this.leave(), 2000);
            return;
        }

        this.users = users;
    }

    private chatUpdated = (snapshot: Firebase.firestore.QuerySnapshot) => {
        const messages:Array<IMessage> = [];
        for (let doc of snapshot.docs) {
            const data = doc.data();

            const ts = data.createdAt as Firebase.firestore.Timestamp;
            data.createdAt = ts.toDate();
            messages.push(data as IMessage);
        };
        this.messages = messages;
        if (this.tab === C.ArenaTab.CHAT) this.readMessage();
    }

    private dealArenaStateTransition = (before:C.ArenaState, after:C.ArenaState) :void => {
        if (before === null || before === after) return;

        switch (after) {
            case C.ArenaState.WAIT:
                OverlayMessageStore.start('上演終了');
                SkywayStore.setDisabled();
                this.agreementState = C.AgreementState.NONE;
                if (this.userState === C.ArenaUserState.ACTOR) this.asyncSetRoomUser();
                this.setModal(false);
                break;
            case C.ArenaState.CONFIRM:
                OverlayMessageStore.start('マイクチェック');
                this.setModal(true);
                break;
            case C.ArenaState.CHECK:
                OverlayMessageStore.start('台本チェック');
                break;
            case C.ArenaState.ACT:
                OverlayMessageStore.start('上演開始');
                break;
        }
        setTimeout(this.playSound, 100);
    }

    private dealArenaMessageTransition = (before:string, after:string) :void => {
        if (before === null || before === after) return;

        if (after !== '') {
            OverlayMessageStore.start(after);
        }
    }

    private preAct = () => {
        const t1 = this.time * 1000 - C.SoundFadeDuration - 7000;
        if (t1 > 0) {
            setTimeout(() => {
                SoundStore.setVolume(0.5);
            }, t1);
        }

        const t2 = this.time * 1000 - C.SoundFadeDuration;
        if (t2 < 0) {
            SoundStore.stop();
        } else {
            setTimeout(() => {
                SoundStore.fadeOut();
            }, t2);
        }
    }

    private playSound = () => {
        if (this.id === null) return;

        switch (this.arenaState) {
            case C.ArenaState.WAIT:
                SoundStore.playRondom(0.4, true);
                break;
            case C.ArenaState.CONFIRM:
                SoundStore.playRondom(0.1, false);
                break;
            case C.ArenaState.CHECK:
                SoundStore.playRondom(0.1, false);
                this.preAct();
                break;
            case C.ArenaState.ACT:
                SoundStore.stop();
                break;
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
        this.unsubscribe = this.ref.onSnapshot((snapshot) => {
            this.arenaUpdated(snapshot);
            this.readMessage();
        });

        //this.userUnsubscribe = this.userRef.onSnapshot(this.usersUpdated);
        this.chatUnsubscribe = this.chatRef.orderBy('createdAt', 'desc').onSnapshot(this.chatUpdated);
    }

    private stopObserve = () => {
        this.unsubscribe();
        //this.userUnsubscribe();
        this.chatUnsubscribe();
    }

    public get = async (id:number) :Promise<void> => {
        return this.db
            .where('id', '==', id)
            .get()
            .then((snapshot :Firebase.firestore.QuerySnapshot) => {
                if (snapshot.size < 1) {
                    Amplitude.error('ArenaStore get', {'id':id});
                    return;
                }
                this.ref = snapshot.docs[0].ref;
                this.userRef = this.ref.collection('RoomUser');
                this.chatRef = this.ref.collection('Chat');
                this.arenaUpdated(snapshot.docs[0]);
            })
            .catch((error) => Amplitude.error('ArenaStore get', error))
            ;
    }

    public getChat = () => {
        return this.chatRef.get()
            .catch((error) => Amplitude.error('ArenaStore getChat', error))
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
        if (this.userNum > C.RoomUserLimit) {
            alert('申し訳ありません、満員のため入室できません。');
            return;
        }

        this.id = id;
        this.agreementState = C.AgreementState.NONE;
        this.tab = C.ArenaTab.SCENARIO;
        this.setModal(false);
        SkywayStore.join('arena'+this.id);

        // ID一個で先にgetしておくのでコメントアウト
        // await this.get(this.id);

        const p = [];
        p.push(this.asyncSetRoomUser());
        p.push(UserStore.asyncSetRoom(this.ref.id));
        //p.push(UserStore.asyncSetConnect(true));
        await Promise.all(p);

        this.observe();

        UserStore.observeConnectionChange();
        Navigator.navigate('Arena', null);
        this.playSound();
    }

    public leave = () => {
        if (this.id === null) return;
        Amplitude.info('ArenaLeave', null);

        this.id = null;
        SkywayStore.leave();
        this.stopObserve();
        UserStore.stopObserveConnectionChange();
        
        UserStore.asyncSetConnect(false);
        clearInterval(this.tickTimeout);
        this.userRef.doc(UserStore.id).delete()
            .catch((error) => Amplitude.error('ArenaStore leave', error))
        ;

        SoundStore.stop();
        Navigator.back();
    }

    public entry = async (state:C.ArenaUserState) => {
        if (!this.users[UserStore.id]) return;

        ConfigStore.load(true);
        setTimeout(() => {
            this.userRef.doc(UserStore.id).update({
                state: state
            })
            .then(() => {
                Amplitude.info('ArenaEntry', null);
                ConfigStore.load(false);
            })
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
        Amplitude.info('ArenaAddChat', null);
        messages.forEach((message) => {
            this.chatRef.doc(message._id).set(message)
                .catch((error) => Amplitude.error('ArenaStore addChat', error))
            ;
        });
    }

    public reportChat = (message:any) => {
        Amplitude.info('ArenaReportChat', {user: message.user});
        const reporter = message.reporter ? message.reporter : [];
        reporter.push(UserStore.id);
        this.chatRef.doc(message._id).update({
            reporter: reporter
        })
            .catch((error) => Amplitude.error('ArenaStore reportChat', error))
        ;
    }

    public reportChatAlert = (context, message:IMessage) => {
        if (message.user._id === UserStore.id) return;

        Alert.alert('', '発言"'+message.text+'"を通報しますか？', [
            { text: '通報する', onPress: () => {this.reportChat(message)} },
            { text: 'Cancel' }
        ]);
    }

    public addNgListAlert = (user:any) => {
        if (UserStore.ngList && UserStore.ngList.indexOf(user._id) !== -1) return;
        if (UserStore.ngList && UserStore.ngList.length >= C.UserNgLimit) {
            alert('NGリストは'+C.UserNgLimit+'件までです。');
            return;
        }

        const text = 'ユーザー"'+user.name+'"をNGリストに追加しますか？\n'
            +'NGリストに追加するとチャットが表示されなくなります。'
            +'NGリストからの削除機能は今後実装予定です。'
        ;

        Alert.alert('', text, [
            {
                text: '追加する', onPress: () => {
                    UserStore.asyncAddNgList(user)
                    .then(() => this.messages = this._messages) // update
                }
            },
            { text: 'Cancel' }
        ]);
    }

}


export default new ArenaStore();