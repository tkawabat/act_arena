import Moment from 'moment';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';
import Navigator from '../lib/Navigator';
import Scheduler from '../lib/Scheduler';


import ConfigStore from './ConfigStore';
import UserStore, { User } from './UserStore';


import MatchingListModel from '../model/MatchingListModel';


class MatchingStore {
    private matchingListModel:MatchingListModel;

    @observable isMatching:boolean = false;

    constructor() {        
    }

    public init = (userId:string) => {
        this.matchingListModel = new MatchingListModel(userId);
        this.matchingListModel.observe(this.matchingListUpdated);
        ConfigStore.setInitLoadComplete('matching');
    }

    @action
    private matchingListUpdated = (snapshot :FirebaseFirestoreTypes.DocumentSnapshot) => {
        this.isMatching = snapshot.exists;
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