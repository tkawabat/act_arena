import Moment from 'moment';
import { observable, action } from 'mobx';

import * as C from '../lib/Const';

class ArenaStore {
    @observable time:number;
    @observable state:C.ArenaState;

    constructor() {
        this.time = 100;
    }

    public decrement() {
        this.time--;
    }

    public hoge() {
        this.state = C.ArenaState.CHECK;
    }
}


export default new ArenaStore();