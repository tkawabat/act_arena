import Moment from 'moment';
import { Alert } from 'react-native';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';
import Navigator from '../lib/Navigator';
import Scheduler from '../lib/Scheduler';
import Permission from '../lib/Permission';

import TheaterUserStore from './TheaterUserStore';
import ChatStore from './ChatStore';
import ConfigStore from './ConfigStore';
import UserStore from './UserStore';
import SkywayStore from './SkywayStore';
import SoundStore from './SoundStore';
import OverlayMessageStore from '../store/OverlayMessageStore';

import TheaterUserModel, { TheaterUser } from '../model/TheaterUserModel';
import TheaterModel, { TheaterCharacter, } from '../model/TheaterModel';



class TheaterStore {
    public reload = () => {};
    
    private theaterModel:TheaterModel;
    private theaterUserModel:TheaterUserModel;

    private endAt: Array<Moment.Moment>;

    @observable id:string = null;
    @observable theaterState:C.TheaterState = C.TheaterState.READ;
    @observable time:number = -1;
    @observable agreement: boolean;
    @observable overlayMessage:string = null;

    @observable title:string = '';
    @observable author:string = '';
    @observable agreementUrl:string = '';
    @observable scenarioUrl:string = '';
    @observable characters:TheaterCharacter[] = [];
    @observable minutes:number = 0;

    private _tab:C.TheaterTab;
    get tab() :C.TheaterTab { return this._tab }
    set tab(tab:C.TheaterTab) {
        ChatStore.isViewable = tab === C.TheaterTab.CHAT;
        if (tab === C.TheaterTab.CHAT) ChatStore.readMessage();
        this._tab = tab;
    }

    @computed get userState() :C.TheaterUserState {
        if (!TheaterUserStore.users[UserStore.id]) return C.TheaterUserState.LISTNER;
        const index = this.characters.findIndex((c) => c.user === UserStore.id);
        return index === -1 ? C.TheaterUserState.LISTNER : C.TheaterUserState.ACTOR;
    }

    @computed get canLeave() {
        if (!TheaterUserStore.users[UserStore.id]) return true;
        return this.userState !== C.TheaterUserState.ACTOR || this.theaterState === C.TheaterState.END;
    }

    @observable modal:boolean = false;

    constructor() {
        this.theaterModel = new TheaterModel();

        this.endAt = new Array<Moment.Moment>();
        this.endAt[C.TheaterState.READ] = Moment().add(-1, 'seconds');
        this.endAt[C.TheaterState.CHECK] = Moment().add(-1, 'seconds');
        this.endAt[C.TheaterState.ACT] = Moment().add(-1, 'seconds');
    }

    @action
    public setAgreement = (agreement) => {
        this.agreement = agreement;
    }

    @action
    public setModal = (modal:boolean) => {
        this.modal = modal;
    }

    @action
    public reloadAgreement = () => {
        this.agreement = false;
        this.reload();
    }

    @action
    public calcState = (endAt:Moment.Moment[]) : [C.TheaterState, number] => {
        // stateと残り時間の計算
        let state:C.TheaterState = C.TheaterState.END;
        let diff:number = -1;
        const now = Moment();
        for (let [key, value] of endAt.entries()) {
            if (now > value) continue;
            
            state = key as C.TheaterState;
            diff = value.diff(now, 'second');
            break;
        }
        return [state, diff];
    }

    @action
    private tick = () => {
        const [state, diff] = this.calcState(this.endAt);
        
        this.dealTheaterStateTransition(this.theaterState, state);
        
        this.theaterState = state;
        this.time = diff;
        
        if (state === C.TheaterState.READ) Scheduler.clearInterval(C.SchedulerTheaterTick);
    }

    @action
    private theaterUpdated = (snapshot :FirebaseFirestoreTypes.DocumentSnapshot) => {
        const data = snapshot.data();

        this.dealArenaMessageTransition(this.overlayMessage, data.message);
        this.overlayMessage = data.message;

        this.endAt[C.TheaterState.READ] = Moment.unix(data.endAt[C.TheaterState.READ].seconds);
        this.endAt[C.TheaterState.CHECK] = Moment.unix(data.endAt[C.TheaterState.CHECK].seconds);
        this.endAt[C.TheaterState.ACT] = Moment.unix(data.endAt[C.TheaterState.ACT].seconds);
        
        this.title = data.title;
        this.author = data.author;
        this.agreementUrl = data.agreementUrl;
        this.scenarioUrl = data.scenarioUrl;
        this.characters = data.characters;
        this.minutes = data.minutes;

        Scheduler.clearInterval(C.SchedulerArenaTick);
        Scheduler.setInterval(C.SchedulerArenaTick, this.tick, 1000);
    }

    // ArenaUserStoreにあるべきだが、退室・SE処理があるのでArenaStoreにおいてある
    private usersUpdated = (snapshot :FirebaseFirestoreTypes.QuerySnapshot) => {
        const users = {};
        snapshot.docs.map((doc) => {
            users[doc.id] = doc.data() as TheaterUser;
        });

        // 退室チェック
        if (this.id !== null && !users[UserStore.id]) {
            OverlayMessageStore.start('接続切れのため退室します');
            Scheduler.setTimeout('', this.leave, 2000);
            return;
        }

        // se
        if (Object.keys(TheaterUserStore.users).length < Object.keys(users).length) {
            this.se(C.SeKey.ENTER_ROOM);
        }

        TheaterUserStore.users = users;
    }

    private dealTheaterStateTransition = (before:C.TheaterState, after:C.TheaterState) :void => {
        if (before === null || before === after) return;

        switch (after) {
            case C.TheaterState.CHECK:
                OverlayMessageStore.start('マイクチェック');

                if (this.userState === C.TheaterUserState.ACTOR) {
                    // マイクオン
                    SkywayStore.setSpeakState(C.SpeakState.MUTE);
                    SkywayStore.toggleMicrophone();
                }
                break;
            case C.TheaterState.ACT:
                if (this.userState === C.TheaterUserState.ACTOR) {
                    // 再接続用
                    SkywayStore.setEnable();
                }
                OverlayMessageStore.start('上演開始');
                
                break;
            case C.TheaterState.END:
                    if (this.userState === C.TheaterUserState.ACTOR) {
                        // 再接続用
                        SkywayStore.setEnable();
                    }
                    OverlayMessageStore.start('上演終了');
                    
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

    private playSound = (before:C.TheaterState, after:C.TheaterState) => {
        if (this.id === null) return;

        switch (after) {
            case C.TheaterState.READ:
                SoundStore.playRondom(0.4, false);
                break;
            case C.TheaterState.CHECK:
                SoundStore.playRondom(0.1, false);
                this.preAct();
                break;
            case C.TheaterState.ACT:
                SoundStore.stop();
                break;
        }

        this.playStateSe(before, after);
    }

    private playStateSe = (before:C.TheaterState, after:C.TheaterState) => {
        if (before === null) return;
        if (before === after) return;

        switch (after) {
            case C.TheaterState.READ:
                break;
            case C.TheaterState.CHECK:
                this.se(C.SeKey.MATCHING);
                break;
            case C.TheaterState.ACT:
                this.se(C.SeKey.ACT_START);
                break;
            case C.TheaterState.END:
                this.se(C.SeKey.ACT_END);
                break;
        }
    }

    private se = (key:C.SeKey) => {
        if (this.id === null) return;
        SoundStore.se(key);
    }

    private observe = () => {
        this.theaterModel.observe(this.theaterUpdated);
        this.theaterUserModel.observe(this.usersUpdated);

        UserStore.observeConnectionChange();
        ChatStore.observe();
    }

    private stopObserve = () => {
        this.theaterModel.stopObserve();
        this.theaterUserModel.stopObserve();

        UserStore.stopObserveConnectionChange();
        ChatStore.stopObserve();
    }

    public asyncSetNext = async () :Promise<void> => {
        return this.theaterUserModel.asyncUpdateNext(UserStore, this.theaterState);
    }

    @action
    public join = async (id:string) => {
        if (TheaterUserStore.userNum >= C.RoomUserLimit) {
            Alert.alert('満員のため入室できません。');
            return;
        }

        const permission = await Permission.asyncCheckTell();
        if (!permission) return;

        this.id = id;
        this.agreement = false;
        this.tab = C.TheaterTab.SCENARIO;
        this.setModal(false);

        SkywayStore.join('theater'+this.id);

        const theaterRef = await this.theaterModel.asyncGetById(this.id);
        if (!theaterRef) {
            return;
        }

        this.theaterUserModel = new TheaterUserModel(theaterRef.ref);
        ChatStore.set(theaterRef.ref.collection('Chat'), false);

        const p = [];
        p.push(this.theaterUserModel.asyncSetRoomUser(UserStore));
        p.push(UserStore.asyncSetTheater(this.theaterModel.id));
        await Promise.all(p).catch(e => console.log(e));

        this.observe();

        Navigator.navigate('Theater', null);
        this.playSound(null, this.theaterState);

        Amplitude.info('JoinTheater', null);
    }

    public leave = () => {
        if (this.id === null) return;

        Scheduler.clearInterval(C.SchedulerArenaTick);
        this.stopObserve();
        SkywayStore.leave();
        SoundStore.stop();

        this.theaterUserModel.asyncDelete(UserStore);

        this.id = null;
        this.theaterState = C.TheaterState.READ;
        this.overlayMessage = null;
        this.title = '';
        this.author = '';
        this.agreementUrl = '';
        this.scenarioUrl = '';
        this.characters = [];
        this.theaterUserModel = null;

        Navigator.backTo('Lobby');
    }
    
}


export default new TheaterStore();