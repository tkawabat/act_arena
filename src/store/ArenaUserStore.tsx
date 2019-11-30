import { Platform, } from 'react-native';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';
import Scheduler from '../lib/Scheduler';

import ChatStore from './ChatStore';
import ConfigStore from './ConfigStore';
import UserStore from './UserStore';


interface ArenaUser {
    name: string
    gender: C.Gender
    iconUrl: string
    state: C.ArenaUserState
}

class ArenaUserStore {
    private _ref:Firebase.firestore.CollectionReference;
    get ref() { return this._ref;}
    set ref(ref:Firebase.firestore.CollectionReference) { this._ref = ref}
    private unsubscribe:Function;

    @observable users:{ [id:string]:ArenaUser} = {};

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

    public asyncSetRoomUser = async () :Promise<void> => {
        return this.ref.doc(UserStore.id).set({
            name: UserStore.name,
            gender: UserStore.gender,
            state: C.ArenaUserState.LISTNER,
        })
        .catch((error) => Amplitude.error('ArenaStore join add user', error))
        ;
    }

    public asyncUpdateState = async (state:C.ArenaUserState) :Promise<void> => {
        return this.ref.doc(UserStore.id).update({
            state: state
        })
        .catch((error) => Amplitude.error('ArenaStore entry', error))
        ;
    }

    public asyncDelete = async () :Promise<void> => {
        return this.ref.doc(UserStore.id).delete()
            .catch((error) => Amplitude.error('ArenaStore leave', error))
        ;
    }

    public observe4lobby = (updated:(snapshot :Firebase.firestore.QuerySnapshot) => void) => {
        this.ref.onSnapshot(updated);
    }

    public observe = (updated:(snapshot :Firebase.firestore.QuerySnapshot) => void) => {
        //this.unsubscribe = this.ref.onSnapshot(updated);

        UserStore.observeConnectionChange();

        if (Platform.OS === 'android') {
            Scheduler.setInterval(C.SchedulerAndroidReload, UserStore.reload, 2 * 60 * 1000);
        }
    }

    public stopObserve = () => {
        //this.unsubscribe();
        ChatStore.stopObserve();
        
        UserStore.stopObserveConnectionChange();

        if (Platform.OS === 'android') {
            Scheduler.clearInterval(C.SchedulerAndroidReload);
        }
    }
}


export default new ArenaUserStore();