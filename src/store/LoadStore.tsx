import Moment from 'moment';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
import { userInfo } from 'os';


class LoadStore {
    @observable font:boolean = false;
    @observable skyway:boolean = false;
    @observable user:boolean = false;

    @computed get isLoaded() {
        return this.font && this.skyway && this.user;
    }
}


export default new LoadStore();