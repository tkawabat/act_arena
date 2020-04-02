import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';

import UserStore from './UserStore';

import { TheaterUser } from '../model/TheaterUserModel';


class TheaterUserStore {
    @observable users:{ [id:string]:TheaterUser} = {};

    @computed get userNum() {
        if (!this.users) return 0;
        return Object.keys(this.users).length;
    }

    @computed get next():boolean {
        if (!this.users[UserStore.id]) return false;
        return this.users[UserStore.id].next;
    }

}


export default new TheaterUserStore();