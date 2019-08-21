import Moment from 'moment';
import { observable, computed, action } from 'mobx';
import { IMessage } from 'react-native-gifted-chat';

import * as C from '../lib/Const';
import firebase from '../lib/Firebase';
import Amplitude, { Error } from '../lib/Amplitude';
import Navigator from '../lib/Navigator';

import UserStore, { User } from './UserStore';
import SkywayStore from './SkywayStore';


class ArenaStore {
    private db:firebase.firestore.CollectionReference;
    private ref:firebase.firestore.DocumentReference;

    // Arena
    private id :number;
    @observable scenario :string;
    @observable arenaState :C.ArenaState;
    @observable time :number;
    @observable users :Array<User>;
    @observable messages:Array<IMessage> = new Array<IMessage>();

    // Scenario
    private scenarioId :string;
    @observable agreementUrl:string;
    @observable agreementScroll:number;
    @observable scenarioUrl:string;
    @observable startText:string;
    @observable endText:string;

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
    }

    private setSnapshotData = (snapshot :firebase.firestore.QuerySnapshot) => {
        const data = snapshot.docs[0].data();
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

    public get = async (id:number) :Promise<void> => {
        this.db
            .where('id', '==', id)
            .get()
            .then((snapshot :firebase.firestore.QuerySnapshot) => {
                if (snapshot.size < 1) {
                    Error('ArenaStore get', {id:id});
                    return;
                }
                this.ref = snapshot.docs[0].ref;
                this.setSnapshotData(snapshot);
            })
            .catch((err) => {
                console.log('Error getting documents', err);
            });
    }

    // public getScenario = async (id:string) :Promise<firebase.firestore.DocumentData> => {
    //     let data: firebase.firestore.DocumentData;
    //     this.db.doc(id)
    //         .get()
    //         .then((snapshot) => {
    //             //this.setSnapshotData(snapshot);
    //         })
    //         .catch((err) => {
    //             console.log('Error getting documents', err);
    //         });

    //     return data;
    // }

    public set = () => {
        const createdAt = Moment().toDate();
        const updatedAt = Moment().toDate();

        this.ref.set({
            createdAt
            , updatedAt
        })
        .then((hoge) => {})
        .catch((err) => {})
        ;
    }

    public update = () => {
        const updatedAt = Moment().toDate();
        this.ref.update({
            updatedAt
        })
        .catch((err) => {console.log(err)})
    }

    public join = async (id) => {
        this.id = id;
        this.arenaState = C.ArenaState.WAIT;
        this.agreementState = C.AgreementState.NONE;

        this.db.where('id', '==', this.id).onSnapshot((snapshot) => {
            this.setSnapshotData(snapshot);
            console.log('hoge');
        });

        this.db.where('id', '==', this.id).onSnapshot((snapshot) => {
            console.log('fuga');
        });

        SkywayStore.join('arena'+this.id);
        await this.get(this.id);

        Navigator.navigate('Arena', null);
    }

    public leave() {
        SkywayStore.leave();
        Navigator.back();
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