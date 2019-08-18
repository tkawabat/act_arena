import { observable, computed } from 'mobx';

import * as C from '../lib/Const';
import firebase from '../lib/Firebase';

import LoadStore from './LoadStore';


export interface User {
    id: string
    , name: string
    , gender: C.Gender
    , iconUrl: string
}

class UserStore implements User {
    @observable id:string;
    @observable name:string;
    @observable gender: C.Gender;
    @observable iconUrl: string;

    @computed get isRegisted() :boolean {
        return this.name ? true : false;
    }

    private providerTwitter;
    private db:firebase.firestore.CollectionReference;
    private onSnapshot;

    constructor() {
        this.db = firebase.firestore().collection('User');
        this.providerTwitter = new firebase.auth.TwitterAuthProvider();

        // サインインしているかどうかの判定
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                this.anonymousLogin();
                return;
            }

            this.id = user.uid;

            if (this.onSnapshot) this.onSnapshot(); // delete old listener
            this.onSnapshot = this.db.where('id', '==', this.id).onSnapshot(this.setSnapshot2field);
            console.log('login ' + user.uid);
            this.get(this.id);
            LoadStore.user = true;
        });

        // サインインしているかどうかの判定２
        //const currentUser = firebase.auth().currentUser;
    }

    private get = async (uid:string) :Promise<void> => {
        this.db
            .where('id', '==', this.id)
            .get()
            .then(this.setSnapshot2field);
    }

    private setSnapshot2field = (snapshot:firebase.firestore.QuerySnapshot) => {
        snapshot.forEach((doc) => {
            let data = doc.data();
            this.name = data.name;
            this.gender = data.gender;
            this.iconUrl = data.iconUrl;
        });
    }

    public set = async (name:string, gender:number) :Promise<void> => {
        this.db.doc(this.id).set({
            name: name
            , gender: gender
        }, {merge: true})
        .then(() => {
            this.get(this.id);
        })
    }

    // ユーザ登録
    public signup(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                if (user) {
                    console.log("Success to Signup")
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    public anonymousLogin() {
        firebase.auth().signInAnonymously().then(result => {
            
        }).catch(error => {
            console.log(error);
        });
    }

    // public login(email, password) {
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //         .then(response => {
    //             alert("Login Success!");
    //         })
    //         .catch(error => {
    //             alert(error.message);
    //         });
    // }

    // public twitterLogin() {
    //     firebase.auth().signInWithRedirect(this.providerTwitter);
    //     firebase.auth().getRedirectResult().then(result => {
    //         console.log(result);
    //         //TODO: ex. storeに送信, DB保存,...
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }

    // public logout = () => {
    //     firebase.auth().signOut()
    //         .then(result => {
    //             console.log(result)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
}

export default new UserStore();