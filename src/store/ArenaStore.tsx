import Moment from 'moment';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
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

import ArenaUserModel, { ArenaUser } from '../model/ArenaUserModel';
import ArenaModel from '../model/ArenaModel';


class ArenaStore {
    private arenaModel:ArenaModel;
    private arenaUserModel:ArenaUserModel;

    private endAt: Array<Moment.Moment>;

    @observable id :number = null; // entered arena
    @observable arenaState:C.ArenaState = C.ArenaState.WAIT;
    @observable time:number;
    @observable overlayMessage:string = null;
    @observable addTimeCount:number = 0;

    private _tab:C.ArenaTab;
    get tab() { return this._tab }
    set tab(tab:C.ArenaTab) {
        ChatStore.isViewable = tab === C.ArenaTab.CHAT;
        if (tab === C.ArenaTab.CHAT) ChatStore.readMessage();

        this._tab = tab
    }

    @observable modal:boolean = false;

    get isPublic() {
        // TODO
        return this.id === 0;
    }

    constructor() {
        this.arenaModel = new ArenaModel();

        this.endAt = new Array<Moment.Moment>();
        this.endAt[C.ArenaState.READ] = Moment().add(-1, 'seconds');
        this.endAt[C.ArenaState.CHECK] = Moment().add(-1, 'seconds');
        this.endAt[C.ArenaState.ACT] = Moment().add(-1, 'seconds');
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
    private arenaUpdated = (snapshot :FirebaseFirestoreTypes.DocumentSnapshot) => {
        const data = snapshot.data();

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
    private usersUpdated = (snapshot :FirebaseFirestoreTypes.QuerySnapshot) => {
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
            this.se(C.SeKey.ENTER_ROOM);
        }

        ArenaUserStore.users = users;
    }

    private dealArenaStateTransition = (before:C.ArenaState, after:C.ArenaState) :void => {
        if (before === null || before === after) return;

        switch (after) {
            case C.ArenaState.WAIT:
                OverlayMessageStore.start('上演終了');

                SkywayStore.setDisabled();
                SkywayStore.leave();

                ArenaScenarioStore.setAgreement(C.AgreementState.NONE);
                if (ArenaUserStore.userState === C.ArenaUserState.ACTOR) {
                    this.arenaUserModel.asyncUpdateState(UserStore, C.ArenaUserState.LISTNER);
                }
                this.setModal(false);
                this.addTimeCount = 0;
                break;
            case C.ArenaState.READ:
                OverlayMessageStore.start('台本チェック');
                this.setModal(true);

                SkywayStore.join('arena'+this.id);

                if (ArenaUserStore.userState === C.ArenaUserState.ACTOR) {
                    Amplitude.info('ArenaBeActor', null);
                    this.addTimeCount = 1;
                }
                break;
            case C.ArenaState.CHECK:
                OverlayMessageStore.start('マイクチェック');

                // 途中入室用
                SkywayStore.join('arena'+this.id);

                if (ArenaUserStore.userState === C.ArenaUserState.ACTOR) {
                    // マイクオン
                    SkywayStore.setSpeakState(C.SpeakState.MUTE);
                    SkywayStore.toggleMicrophone();
                    this.addTimeCount = 1;
                }
                break;
            case C.ArenaState.ACT:
                OverlayMessageStore.start('上演開始');

                // 途中入室用
                SkywayStore.join('arena'+this.id);
                
                if (ArenaUserStore.userState === C.ArenaUserState.ACTOR) {
                    this.addTimeCount = 2;
                }
                break;
        }
        this.playSound(before, after);
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

    private playSound = (before:C.ArenaState, after:C.ArenaState) => {
        if (this.id === null) return;

        switch (after) {
            case C.ArenaState.WAIT:  
                Scheduler.setTimeout('', () => SoundStore.playRondom(0.4, true), 1000);
                break;
            case C.ArenaState.READ:
                SoundStore.playRondom(0.4, false);
                break;
            case C.ArenaState.CHECK:
                SoundStore.playRondom(0.1, false);
                this.preAct();
                break;
            case C.ArenaState.ACT:
                SoundStore.stop();
                break;
        }

        this.playStateSe(before, after);
    }

    private playStateSe = (before:C.ArenaState, after:C.ArenaState) => {
        if (before === null) return;
        if (before === after) return;

        switch (after) {
            case C.ArenaState.WAIT:
                if (this.overlayMessage === '') { // 正常終了
                    this.se(C.SeKey.ACT_END);
                }
                break;
            case C.ArenaState.READ:
                this.se(C.SeKey.MATCHING);
                break;
            case C.ArenaState.CHECK:
                break;
            case C.ArenaState.ACT:
                this.se(C.SeKey.ACT_START);
                break;
        }
    }

    private se = (key:C.SeKey) => {
        if (this.id === null) return;
        SoundStore.se(key);
    }

    private observe = () => {
        this.arenaModel.observe(this.arenaUpdated);
        this.arenaUserModel.observe(this.usersUpdated);

        UserStore.observeConnectionChange();
        ChatStore.observe();
    }

    private stopObserve = () => {
        this.arenaModel.stopObserve();
        this.arenaUserModel.stopObserve();

        UserStore.stopObserveConnectionChange();
        ChatStore.stopObserve();
    }

    public asyncAddActTime = async () :Promise<void> => {
        if (this.time < 2) return;
        if (this.addTimeCount <= 0) return;
        
        this.addTimeCount--;
        
        return this.arenaModel.asyncAddActTime(this.endAt);
    }

    @action
    public join = async (id:number) => {
        if (ArenaUserStore.userNum >= C.RoomUserLimit) {
            alert('申し訳ありません、満員のため入室できません。');
            return;
        }

        const event = this.isPublic ? 'JoinPublicArena' : 'JoinPrivateArena';
        Amplitude.info(event, null);

        this.id = id;
        ArenaScenarioStore.setAgreement(C.AgreementState.NONE);
        this.tab = C.ArenaTab.SCENARIO;
        this.setModal(false);

        const arenaRef = await this.arenaModel.asyncGet(this.id, true);
        if (!arenaRef) {
            alert('エラーが発生しました。');
            return;
        }
        this.arenaUserModel = new ArenaUserModel(arenaRef.ref);
        // TODO publicアリーナの判定方法
        ChatStore.set(arenaRef.ref.collection('Chat'), this.isPublic);

        const p = [];
        p.push(this.arenaUserModel.asyncSetRoomUser(UserStore));
        p.push(UserStore.asyncSetRoom(this.arenaModel.id));
        //p.push(UserStore.asyncSetConnect(true));
        await Promise.all(p).catch(e => console.log(e));

        this.observe();

        Navigator.navigate('Arena', null);
        this.playSound(null, this.arenaState);
    }

    public leave = () => {
        if (this.id === null) return;

        Scheduler.clearInterval(C.SchedulerArenaTick);
        this.stopObserve();
        SkywayStore.leave();
        SoundStore.stop();

        UserStore.asyncSetConnect(false);
        this.arenaUserModel.asyncDelete(UserStore);

        this.id = null;
        this.arenaState = C.ArenaState.WAIT;
        ArenaUserStore.userState = C.ArenaUserState.LISTNER;
        this.arenaUserModel = null;

        Navigator.back();
    }

    public entry = async (state:C.ArenaUserState) => {
        if (!ArenaUserStore.users[UserStore.id]) return;

        ConfigStore.load(true);
        Scheduler.setTimeout('', () => {
            this.arenaUserModel.asyncUpdateState(UserStore, state)
            .then(() => {
                Amplitude.info('ArenaEntry', null);
                ConfigStore.load(false);
            })
            ;
        }, 1000);
    }
    
}


export default new ArenaStore();