import { observable, computed, action } from 'mobx';
import { Dimensions } from 'react-native';

import * as C from '../lib/Const';


class OverlayMessageStore {
    @observable state:C.OverlayMessageState = C.OverlayMessageState.INIT;
    @observable message:string = '';
    @observable from:number = 0;
    @observable to:number = 0;
    @observable duration:number = 0;

    @action start = (message:string) => {
        if (this.state !== C.OverlayMessageState.INIT) return;
        this.state = C.OverlayMessageState.FIRST;
        this.message = message;
        this.from = width * 2;
        this.to = width;
        this.duration = 700;
    }

    @action animationEnd = () => {
        if (this.state === C.OverlayMessageState.FIRST) {
            setTimeout(() => {
                this.state = C.OverlayMessageState.SECOND;
                this.from = width;
                this.to = 0;
                this.duration = 400;
            }, 400);
        } else if (this.state === C.OverlayMessageState.SECOND) {
            this.state = C.OverlayMessageState.INIT;
        }
    }
}

const {height, width} = Dimensions.get('window');

export default new OverlayMessageStore();