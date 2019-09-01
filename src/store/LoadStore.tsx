import Moment from 'moment';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';


class LoadStore {
    @observable font:boolean = false;
    @observable skyway:boolean = false;
    @observable user:boolean = false;

    @observable isLoad:boolean = false;

    @computed get isInitLoaded() {
        //return this.font && this.skyway && this.user;
        return this.font && this.user;
    }

    @action load = (load:boolean) => {
        this.isLoad = load;
    }
}


export default new LoadStore();