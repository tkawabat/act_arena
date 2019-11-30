import Moment from 'moment';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';
import Navigator from '../lib/Navigator';
import Scheduler from '../lib/Scheduler';

import ArenaScenarioStore from './ArenaScenarioStore';
import ArenaUserStore from './ArenaUserStore';
import ChatStore from './ChatStore';
import ConfigStore from './ConfigStore';
import UserStore from './UserStore';
import SkywayStore from './SkywayStore';
import SoundStore from './SoundStore';
import OverlayMessageStore from '../store/OverlayMessageStore';


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

    private id :number = null; // entered arena
    private endAt: Array<Moment.Moment>;

    @observable arenaState:C.ArenaState = C.ArenaState.WAIT;
    @observable time:number;
    @observable overlayMessage:string = null;
    @observable addTimeCount:number = 0;

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

    constructor() {
        this.db = Firebase.firestore().collection('Arena');

        this.endAt = new Array<Moment.Moment>();
        this.endAt[C.ArenaState.READ] = Moment().add(-1, 'seconds');
        this.endAt[C.ArenaState.CHECK] = Moment().add(-1, 'seconds');
        this.endAt[C.ArenaState.ACT] = Moment().add(-1, 'seconds');

        this.get(0)
            .then(() => {
                ArenaUserStore.observe4lobby(this.usersUpdated);
                ConfigStore.setInitLoadComplete('arena');
            })
        ;
    }

    @action
    public setModal = (modal:boolean) => {
        this.modal = modal;
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
        this.overlayMessage = data.message;

        this.endAt[C.ArenaState.READ] = Moment.unix(data.endAt[C.ArenaState.READ].seconds);
        this.endAt[C.ArenaState.CHECK] = Moment.unix(data.endAt[C.ArenaState.CHECK].seconds);
        this.endAt[C.ArenaState.ACT] = Moment.unix(data.endAt[C.ArenaState.ACT].seconds);
        ArenaScenarioStore.updated(snapshot);

        Scheduler.clearInterval(C.SchedulerArenaTick);
        Scheduler.setInterval(C.SchedulerArenaTick, this.tick, 1000);
    }

    // ArenaUserStoreにあるべきだが、退室・SE処理があるのでArenaStoreにおいてある
    // TODO Serviceを作って移動
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
        if (Object.keys(ArenaUserStore.users).length < Object.keys(users).length) {
            this.se('enterRoom');
        }

        ArenaUserStore.users = users;
    }

    private dealArenaStateTransition = (before:C.ArenaState, after:C.ArenaState) :void => {
        if (before === null || before === after) return;

        switch (after) {
            case C.ArenaState.WAIT:
                OverlayMessageStore.start('上演終了');
                SkywayStore.setDisabled();
                this.agreementState = C.AgreementState.NONE;
                if (ArenaUserStore.userState === C.ArenaUserState.ACTOR) {
                    ArenaUserStore.asyncSetRoomUser();
                }
                this.setModal(false);
                this.addTimeCount = 0;
                break;
            case C.ArenaState.READ:
                OverlayMessageStore.start('台本チェック');
                this.setModal(true);

                if (ArenaUserStore.userState === C.ArenaUserState.ACTOR) {
                    Amplitude.info('ArenaBeActor', null);
                    this.addTimeCount = 1;
                }
                break;
            case C.ArenaState.CHECK:
                OverlayMessageStore.start('マイクチェック');
                if (ArenaUserStore.userState === C.ArenaUserState.ACTOR) {
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
                if (ArenaUserStore.userState === C.ArenaUserState.ACTOR) {
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

    private observe = () => {
        this.unsubscribe = this.ref.onSnapshot((snapshot) => {
            this.arenaUpdated(snapshot);
        });

        ArenaUserStore.observe(this.usersUpdated);
        ChatStore.observe();
    }

    private stopObserve = () => {
        this.unsubscribe();
        ArenaUserStore.stopObserve();
        ChatStore.stopObserve();
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
                ArenaUserStore.ref = this.ref.collection('RoomUser');
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
        if (ArenaUserStore.userNum >= C.RoomUserLimit) {
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
        p.push(ArenaUserStore.asyncSetRoomUser());
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
        ArenaUserStore.asyncDelete();

        SoundStore.stop();
        Navigator.back();
    }

    public entry = async (state:C.ArenaUserState) => {
        if (!ArenaUserStore.users[UserStore.id]) return;

        ConfigStore.load(true);
        Scheduler.setTimeout('', () => {
            ArenaUserStore.asyncUpdateState(state)
            .then(() => {
                Amplitude.info('ArenaEntry', null);
                ConfigStore.load(false);
            })
            ;
        }, 1000);
    }
    
}


export default new ArenaStore();