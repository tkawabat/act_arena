import Moment from 'moment';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
import firebase from '../lib/Firebase';

class ArenaStore {
    private db:firebase.firestore.CollectionReference;

    // public state
    @observable arenaState:C.ArenaState;
    @observable time:number;

    @observable agreementUrl:string;
    @observable agreementScroll:number;
    @observable scenarioUrl:string;
    @observable startText:string;
    @observable endText:string;
    //@observable messages:Array<string>;

    // private state
    @observable agreementState:C.AgreementState;

    @computed get isReadAgreement() {
        return this.agreementState != C.AgreementState.NONE;
    }

    @computed get isAgree() {
        return this.agreementState != C.AgreementState.AGREE;
    }

    constructor() {
        this.db = firebase.firestore().collection('Arena');
        this.db.onSnapshot((snapshot) => {
            // docsのdataをmessagesとして取得
            const messages = snapshot.docs.map((doc) => {
              return doc.data();
            });
            console.log('hoge');
            console.log(messages);
        });
    }
    public set = () => {
        const createdAt = Moment().toDate();
        const updatedAt = Moment().toDate();
        this.db.doc('arena1').set({
            createdAt
            , updatedAt
        });
    }

    public update = () => {
        const updatedAt = Moment().toDate();
        this.db.doc('arena1').update({
            updatedAt
        })
    }

    public get = async (id:string) :Promise<firebase.firestore.DocumentData> => {
        let data: firebase.firestore.DocumentData;
        this.db
            .where('id', '==', id)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    data = doc.data();
                });
            })
            .catch((err) => {
                console.log('Error getting documents', err);
            });

        return data;
    }

    public join = async () => {
        await this.get('arena1');

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