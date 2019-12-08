import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';


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
    @observable agreementState:C.AgreementState;

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
    public readAgreement = () => {
        if (this.agreementState === C.AgreementState.NONE) {
            this.agreementState = C.AgreementState.READ;
        }
    }

    @action
    public updated = (snapshot :Firebase.firestore.DocumentSnapshot) => {
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