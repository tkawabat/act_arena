import { observable, computed, action } from 'mobx';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';
import Scheduler from '../lib/Scheduler';


interface Characters {
    name: string
    gender: C.Gender
    user: string
    userName: string
}

class ArenaScenarioStore {
    public scroll2Top = () => {};
    public scroll2Start = () => {};

    @observable title:string = '';
    @observable agreementUrl:string = '';
    @observable agreementScroll:number = 0;
    @observable scenarioUrl:string = '';
    @observable startText:string = '';
    @observable endText:string = '';
    @observable characters:Array<Characters> = [];

    // private state
    @observable _colored:boolean = false;
    get colored() { return this._colored}
    set colored(colored:boolean) { this._colored = colored; }
    @observable agreementState:C.AgreementState = C.AgreementState.NONE;

    @computed get isReadAgreement() {
        return this.agreementState !== C.AgreementState.NONE;
    }

    @computed get isAgree() {
        return this.agreementState === C.AgreementState.AGREE;
    }

    @action
    public setAgreement = (agreement:C.AgreementState) => {
        this.agreementState = agreement;
    }

    @action
    public reloadAgreement = () => {
        this.agreementState = C.AgreementState.NONE;
        this.colored = false;

        const url = this.agreementUrl;
        const scroll = this.agreementScroll;
        this.agreementUrl = '';
        Scheduler.setTimeout('', () => {
            this.agreementScroll = scroll;
            this.agreementUrl = url;
        }, 100);
    }

    @action
    public readAgreement = () => {
        if (this.agreementState === C.AgreementState.NONE) {
            this.agreementState = C.AgreementState.READ;
        }
    }

    @action
    public updated = (snapshot :FirebaseFirestoreTypes.DocumentSnapshot) => {
        const data = snapshot.data();

        this.title = data.title;
        this.agreementUrl = data.agreementUrl;
        this.agreementScroll = data.agreementScroll;
        this.scenarioUrl = data.scenarioUrl;
        this.startText = data.startText;
        this.endText = data.endText;
        this.characters = data.characters;
    }
}


export default new ArenaScenarioStore();