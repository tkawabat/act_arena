import Moment from 'moment';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { observable, computed, action } from 'mobx';
import { showMessage, } from "react-native-flash-message";

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';
import Scheduler from '../lib/Scheduler';

import ConfigStore from './ConfigStore';
import UserStore, { User } from './UserStore';
import SoundStore from './SoundStore';

import MatchingListModel from '../model/MatchingListModel';


class MatchingStore {
    private matchingListModel:MatchingListModel;

    @observable isMatching:boolean = false;

    @observable showStartDatePicker:boolean = false;
    @observable showEndDatePicker:boolean = false;
    @observable startAt:Moment.Moment = Moment();
    @observable endAt:Moment.Moment = Moment().add(1, 'hours');

    @observable actArena:boolean = true;
    @observable discord:boolean = true;
    @observable pair:boolean = true;
    @observable smallNumber:boolean = true;
    @observable half:boolean = true;
    @observable one:boolean = true;
    @observable oneHalf:boolean = true;
    @observable two:boolean = true;

    @action toggleActArena = () => this.actArena = !this.actArena;
    @action toggleDiscord = () => this.discord = !this.discord;
    @action togglePair = () => this.pair = !this.pair;
    @action toggleSmallNumber = () => this.smallNumber = !this.smallNumber;
    @action toggleHalf = () => this.half = !this.half;
    @action toggleOne = () => this.one = !this.one;
    @action toggleOneHalf = () => this.oneHalf = !this.oneHalf;
    @action toggleTwo = () => this.two = !this.two;

    private createdAt:FirebaseFirestoreTypes.Timestamp = null;
    get limit() :Moment.Moment {
        if (!this.createdAt) {
            return null;
        }
        return Moment.unix(this.createdAt.seconds).add(C.MatchingTime, 'seconds');
    }

    constructor() {
    }

    public init = (userId:string) => {
        this.matchingListModel = new MatchingListModel(userId);
        this.matchingListModel.observe(this.matchingListUpdated);
        ConfigStore.setInitLoadComplete('matching');
    }

    private checkTimeLimit = () => {
        if (!this.limit) {
            this.isMatching = false;
            Scheduler.clearInterval(C.SchedulerMatchingTimeLimitCheck);
            return;
        }

        if (Moment().unix() <= this.limit.unix()) {
            this.isMatching = true;
            return;
        }

        // 時間切れ
        Scheduler.clearInterval(C.SchedulerMatchingTimeLimitCheck);
        this.matchingListModel.asyncDelete();
        SoundStore.se(C.SeKey.CANCEL);
        showMessage({
            autoHide: false,
            message: '時間切れのため、マッチングをキャンセルしました。',
            titleStyle: { fontSize: 16 },
        });
        this.isMatching = false;
    }

    @action
    private matchingListUpdated = (snapshot :FirebaseFirestoreTypes.DocumentSnapshot) => {
        if (!snapshot.exists) {
            this.isMatching = false;
            this.createdAt = null;
            return;
        }

        const data = snapshot.data();
        this.actArena = data.places.includes(C.MatchingPlace.ACTARENA);
        this.discord = data.places.includes(C.MatchingPlace.DISCORD);
        this.pair = data.playNumbers.includes(2);
        this.smallNumber = data.playNumbers.includes(3) || data.playNumbers.includes(4) || data.playNumbers.includes(5);
        this.half = data.playTimes.includes(C.MatchingPlayTime.HALF);
        this.one = data.playTimes.includes(C.MatchingPlayTime.ONE);
        this.oneHalf = data.playTimes.includes(C.MatchingPlayTime.ONEHALF);
        this.two = data.playTimes.includes(C.MatchingPlayTime.TWO);
        this.startAt = Moment.unix(data.startAt.seconds);
        this.endAt = Moment.unix(data.endAt.seconds);
        this.createdAt = data.createdAt;

        Scheduler.clearInterval(C.SchedulerMatchingTimeLimitCheck);
        this.checkTimeLimit();
        
        if (this.isMatching) {
            Scheduler.setInterval(C.SchedulerMatchingTimeLimitCheck, this.checkTimeLimit, 60 * 1000);
        }
    }

    public toggle = async () => {
        if (this.isMatching) {
            return this.leave();
        } else {
            showMessage({
                autoHide: false,
                message: 'マッチング開始！',
                description: 'バックグラウンドの間もマッチングは継続します。'
                +'\nマッチングすると通知でお知らせます。',
                titleStyle: { fontSize: 16 },
            });
            return this.entry();
        }
    }

    public entry = async () => {
        const playNumbers = [];
        const playTimes = [];
        const places = [];

        if (this.pair) playNumbers.push(2);
        if (this.smallNumber) playNumbers.push(3,4,5);
        if (playNumbers.length < 1) {
            // Alert.alert
            //TODO
        }

        if (this.half) playTimes.push(C.MatchingPlayTime.HALF);
        if (this.one) playTimes.push(C.MatchingPlayTime.ONE);
        if (this.oneHalf) playTimes.push(C.MatchingPlayTime.ONEHALF);
        if (this.two) playTimes.push(C.MatchingPlayTime.TWO);

        if (this.actArena) places.push(C.MatchingPlace.ACTARENA);
        if (this.discord) places.push(C.MatchingPlace.DISCORD);

        // set
        ConfigStore.load(true);
        Scheduler.setTimeout('', () => {
            this.matchingListModel.asyncSet(
                UserStore,
                playNumbers,
                playTimes,
                places,
                this.startAt,
                this.endAt,    
            )
            .then(() => {
                Amplitude.info('MatchingEntry', null);
                ConfigStore.load(false);
            })
            ;
        }, 1000);
    }

    public leave = async () => {
        ConfigStore.load(true);
        Scheduler.setTimeout('', () => {
            this.matchingListModel.asyncDelete()
            .then(() => {
                Amplitude.info('MatchingLeave', null);
                ConfigStore.load(false);
            })
            ;
        }, 1000);
    }
    

}


export default new MatchingStore();