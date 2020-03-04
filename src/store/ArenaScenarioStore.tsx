import { observable, computed, action } from 'mobx';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';


interface Characters {
    name: string
    gender: C.Gender
    user: string
    userName: string
}

class ArenaScenarioStore {
    public scroll2Top = () => {};
    public scroll2Start = () => {};
    public reload = () => {};

    @observable title:string = '';
    @observable agreementUrl:string = '';
    @observable agreementScroll:number = 0;
    @observable scenarioUrl:string = '';
    @observable startText:string = '';
    @observable endText:string = '';
    @observable characters:Array<Characters> = [];

    // private state
    @observable _isColored:boolean = false;
    get isColored() { return this._isColored}
    set isColored(isColored:boolean) { this._isColored = isColored; }
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
        this.isColored = false;
        this.reload();
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