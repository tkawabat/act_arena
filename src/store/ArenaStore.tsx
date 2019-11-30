import Moment from 'moment';
import { Alert, Platform, } from 'react-native';
import { observable, computed, action } from 'mobx';
import { IMessage } from 'react-native-gifted-chat';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';
import Navigator from '../lib/Navigator';
import Scheduler from '../lib/Scheduler';

import ChatStore from './ChatStore';
import ConfigStore from './ConfigStore';
import UserStore from './UserStore';
import SkywayStore from './SkywayStore';
import SoundStore from './SoundStore';
import OverlayMessageStore from '../store/OverlayMessageStore';

interface Characters {
    name: string
    gender: C.Gender
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

    public scroll2Top = () => {};
    public scroll2Start = () => {};

    // Arena
    private id :number = null; // entered arena
    private endAt: Array<Moment.Moment>;

    @observable scenario:string;
    @observable arenaState:C.ArenaState = C.ArenaState.WAIT;
    @observable time:number;
    @observable users:{ [id:string]:ArenaUser} = {};
    @observable overlayMessage:string = null;
    @observable addTimeCount:number = 0;

    // Scenario
    @observable title:string;
    @observable agreementUrl:string;
    @observable agreementScroll:number;
    @observable scenarioUrl:string;
    @observable startText:string;
    @observable endText:string;
    @observable characters:Array<Characters>;

    // private state
    @observable agreementState:C.AgreementState;
    private _tab:C.ArenaTab;
    get tab() { return this._tab }
    set tab(tab:C.ArenaTab) {
        ChatStore.isViewable = tab === C.ArenaTab.CHAT;
        if (tab === C.ArenaTab.CHAT) ChatStore.readMessage();

        this._tab = tab
    }

    @observable modal:boolean = false;

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

    set userState(state:C.ArenaUserState) {
        if (!this.users[UserStore.id]) return;
        this.users[UserStore.id].state = state;
    }

    @computed get canLeave() {
        if (!this.users[UserStore.id]) return true;
        return this.users[UserStore.id].state !== C.ArenaUserState.ACTOR;
    }

    @computed get userNum() {
        if (!this.users) return 0;
        return Object.keys(this.users).length;
    }

    constructor() {
        this.db = Firebase.firestore().collection('Arena');

        this.endAt = new Array<Moment.Moment>();
        this.endAt[C.ArenaState.READ] = Moment().add(-1, 'seconds');
        this.endAt[C.ArenaState.CHECK] = Moment().add(-1, 'seconds');
        this.endAt[C.ArenaState.ACT] = Moment().add(-1, 'seconds');

        this.get(0)
            .then(() => {
                this.userRef.get().then(this.usersUpdated);
                this.userUnsubscribe = this.userRef.onSnapshot(this.usersUpdated);
                ConfigStore.setInitLoadComplete('arena');
            })
        ;
    }

    @action
    public setModal = (modal:boolean) => {
        this.modal = modal;
    }

    @action
    public setAgreement = (agreement:C.AgreementState) => {
        this.agreementState = agreement;
    }

    @action
    private tick = () => {
        // stateと残り時間の計算
        let state:C.ArenaState = C.ArenaState.WAIT;
        let diff:number = -1;

        const now = Moment();
        for (let [key, value] of this.endAt.entries()) {
            if (key === C.ArenaState.WAIT) continue;
            if (now > value) continue;
            
            state = key as C.ArenaState;
            diff = value.diff(now, 'second');
            break;
        }

        this.dealArenaStateTransition(this.arenaState, state);
        this.arenaState = state;
        this.time = diff;
        
        if (state === C.ArenaState.WAIT) Scheduler.clearInterval(C.SchedulerArenaTick);
    }

    @action
    private arenaUpdated = (snapshot :Firebase.firestore.DocumentSnapshot) => {
        const data = snapshot.data();

        //this.dealArenaStateTransition(this.arenaState, data.state);
        this.dealArenaMessageTransition(this.overlayMessage, data.message);

        this.endAt[C.ArenaState.READ] = Moment.unix(data.endAt[C.ArenaState.READ].seconds);
        this.endAt[C.ArenaState.CHECK] = Moment.unix(data.endAt[C.ArenaState.CHECK].seconds);
        this.endAt[C.ArenaState.ACT] = Moment.unix(data.endAt[C.ArenaState.ACT].seconds);
        this.title = data.title;
        this.agreementUrl = data.agreementUrl;
        this.agreementScroll = data.agreementScroll;
        this.scenarioUrl = data.scenarioUrl;
        this.startText = data.startText;
        this.endText = data.endText;
        this.overlayMessage = data.message;
        this.characters = data.characters;

        Scheduler.clearInterval(C.SchedulerArenaTick);
        Scheduler.setInterval(C.SchedulerArenaTick, this.tick, 1000);
    }

    private usersUpdated = (snapshot :Firebase.firestore.QuerySnapshot) => {
        const users = {};
        snapshot.docs.map((doc) => {
            users[doc.id] = doc.data() as ArenaUser;
        });

        // 退室チェック
        if (this.id !== null && !users[UserStore.id]) {
            OverlayMessageStore.start('接続切れのため退室します');
            Scheduler.setTimeout('', this.leave, 2000);
            return;
        }

        // se
        if (Object.keys(this.users).length < Object.keys(users).length) {
            this.se('enterRoom');
        }

        this.users = users;
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
                this.addTimeCount = 0;
                break;
            case C.ArenaState.READ:
                OverlayMessageStore.start('台本チェック');
                this.setModal(true);

                if (this.userState === C.ArenaUserState.ACTOR) {
                    Amplitude.info('ArenaBeActor', null);
                    this.addTimeCount = 1;
                }
                break;
            case C.ArenaState.CHECK:
                OverlayMessageStore.start('マイクチェック');
                if (this.userState === C.ArenaUserState.ACTOR) {
                    // マイクオン
                    if (SkywayStore.speakState === C.SpeakState.DISABLED) {
                        SkywayStore.setSpeakState(C.SpeakState.MUTE);
                        SkywayStore.toggleMicrophone();
                    }
                    this.addTimeCount = 1;
                }
                break;
            case C.ArenaState.ACT:
                OverlayMessageStore.start('上演開始');
                if (this.userState === C.ArenaUserState.ACTOR) {
                    this.addTimeCount = 2;
                }
                break;
        }
        Scheduler.setTimeout('', this.playSound, 100);
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
            Scheduler.setTimeout('', () => {
                SoundStore.setVolume(0.5);
            }, t1);
        }

        const t2 = this.time * 1000 - C.SoundFadeDuration;
        if (t2 < 0) {
            SoundStore.stop();
        } else {
            Scheduler.setTimeout('', () => {
                SoundStore.fadeOut();
            }, t2);
        }
    }

    private se = (key:string) => {
        if (this.id === null) return;
        SoundStore.se(key);
    }

    private playSound = () => {
        if (this.id === null) return;

        switch (this.arenaState) {
            case C.ArenaState.WAIT:
                SoundStore.playRondom(0.4, true);
                break;
            case C.ArenaState.READ:
                this.se('matching');
                SoundStore.playRondom(0.1, false);
                break;
            case C.ArenaState.CHECK:
                SoundStore.playRondom(0.1, false);
                this.preAct();
                break;
            case C.ArenaState.ACT:
                SoundStore.stop();
                this.se('actStart');
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
        });

        // this.userUnsubscribe = this.userRef.onSnapshot(this.usersUpdated);
        ChatStore.observe();

        UserStore.observeConnectionChange();

        if (Platform.OS === 'android') {
            Scheduler.setInterval(C.SchedulerAndroidReload, UserStore.reload, 2 * 60 * 1000);
        }
    }

    private stopObserve = () => {
        this.unsubscribe();
        //this.userUnsubscribe();
        ChatStore.stopObserve();
        
        UserStore.stopObserveConnectionChange();

        if (Platform.OS === 'android') {
            Scheduler.clearInterval(C.SchedulerAndroidReload);
        }
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
                ChatStore.ref = this.ref.collection('Chat');
                this.arenaUpdated(snapshot.docs[0]);
            })
            .catch((error) => Amplitude.error('ArenaStore get', error))
            ;
    }

    public asyncAddActTime = async () :Promise<void> => {
        if (this.time < 2) return;
        if (this.addTimeCount <= 0) return;
        
        this.addTimeCount--;
        const endAt = [];
        const now = Moment();
        for (let [key, value] of this.endAt.entries()) {
            if (value < now) {
                endAt[key] = value.toDate(); // すでに終わったstateは更新しない。
            } else {
                endAt[key] = value.add(30, 'seconds').toDate();
            }
        }
        
        return this.ref.update({
            endAt: endAt
        })
        .catch((error) => Amplitude.error('ArenaStore add act time', error))
        ;
    }

    @action
    public join = async (id:number) => {
        if (this.userNum >= C.RoomUserLimit) {
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

        Navigator.navigate('Arena', null);
        this.playSound();
    }

    public leave = () => {
        if (this.id === null) return;
        Amplitude.info('ArenaLeave', null);

        this.id = null;
        SkywayStore.leave();

        this.stopObserve();
        
        UserStore.asyncSetConnect(false);
        Scheduler.clearInterval(C.SchedulerArenaTick);
        this.userRef.doc(UserStore.id).delete()
            .catch((error) => Amplitude.error('ArenaStore leave', error))
        ;

        SoundStore.stop();
        Navigator.back();
    }

    public entry = async (state:C.ArenaUserState) => {
        if (!this.users[UserStore.id]) return;

        ConfigStore.load(true);
        Scheduler.setTimeout('', () => {
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
}


export default new ArenaStore();