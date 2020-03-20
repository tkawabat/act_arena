import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';

import UserStore from './UserStore';


export interface ArenaUser {
    name: string
    gender: C.Gender
    iconUrl: string
    state: C.ArenaUserState
}

class ArenaUserStore {
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

}


export default new ArenaUserStore();