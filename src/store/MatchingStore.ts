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
import OverlayMessageStore from './OverlayMessageStore';


import MatchingListModel from '../model/MatchingListModel';


class MatchingStore {
    private matchingListModel:MatchingListModel;

    constructor() {
        this.matchingListModel = new MatchingListModel();
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
            this.matchingListModel.asyncDelete(UserStore)
            .then(() => {
                Amplitude.info('MatchingLeave', null);
                ConfigStore.load(false);
            })
            ;
        }, 1000);
    }

}


export default new MatchingStore();