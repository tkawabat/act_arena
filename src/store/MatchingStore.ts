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
            return this.entry();
        }
    }

    public entry = async () => {
        ConfigStore.load(true);
        Scheduler.setTimeout('', () => {
            this.matchingListModel.asyncSet(UserStore)
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