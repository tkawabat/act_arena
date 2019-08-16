import Moment from 'moment';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';

class ArenaStore {
    @observable arenaState:C.ArenaState;
    @observable agreementState:C.AgreementState;
    @observable time:number;

    @observable agreementUrl:string;
    @observable agreementScroll:number;
    @observable scenarioUrl:string;
    @observable startText:string;
    @observable endText:string;

    @computed get isReadAgreement() {
        return this.agreementState != C.AgreementState.NONE;
    }

    @computed get isAgree() {
        return this.agreementState != C.AgreementState.AGREE;
    }

    public join = () => {
        this.arenaState = C.ArenaState.WAIT;
        this.agreementState = C.AgreementState.NONE;
        this.time = 100;

        this.agreementUrl = 'http://doodletxt.web.fc2.com/';
        this.agreementScroll = 2500;
        this.scenarioUrl = 'http://doodletxt.web.fc2.com/paranormansboogie3.html';
        this.startText = '宝屋敷：ちょっとぉ、ボケるには早いんじゃないのぉ？';
        this.endText = 'セオドア：観光と、仕事と、半分半分かな。';

        // this.agreementUrl = 'http://uriuriko.web.fc2.com/about.html';
        // this.agreementScroll = 0;
        // this.scenarioUrl = 'http://uriuriko.web.fc2.com/kizuato12.htm';
        // this.startText = 'レイス「あは…はははっ！」';
        // this.endText = 'レイス「剣の脆弱（ぜいじゃく）さ、思い知らせてあげるよ。」';
    }

    public decrement() {
        this.time--;
    }

    public readAgreement() {
        if (this.agreementState === C.AgreementState.NONE) {
            this.agreementState = C.AgreementState.READ;
        }
    }

    public agree = () => {
        this.agreementState = C.AgreementState.AGREE;
    }
}


export default new ArenaStore();