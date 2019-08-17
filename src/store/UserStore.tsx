import * as C from '../lib/Const';
import firebase from '../lib/Firebase';

import LoadStore from './LoadStore';
import { observable } from 'mobx';


export interface User {
    id: string
    , name: string
    , gender: C.Gender
    , iconUrl: string
}

// class UserStore implements User {
class UserStore {
    @observable uid:string;
    @observable name:string;
    @observable gender: C.Gender;
    @observable iconUrl: string;

    private providerTwitter;

    constructor() {
        this.providerTwitter = new firebase.auth.TwitterAuthProvider();

        // サインインしているかどうかの判定
        firebase.auth().onAuthStateChanged(user => {
            LoadStore.user = true;
            if (!user) {
                // サインイン中でない
                this.uid = '';
            } else {
                // サインイン中。画面遷移などの処理をする。
                console.log('Signed in');
                console.log(user);
                this.uid = user.uid;
            }
        })

        // サインインしているかどうかの判定２
        //const currentUser = firebase.auth().currentUser;
    }

    // メール＆パスワードログイン
    public login(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                alert("Login Success!");
            })
            .catch(error => {
                alert(error.message);
            });
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
            console.log(result);
            //TODO: ex. storeに送信, DB保存,...
        }).catch(error => {
            console.log(error);
        });
    }

    public twitterLogin() {
        firebase.auth().signInWithRedirect(this.providerTwitter);
        firebase.auth().getRedirectResult().then(result => {
            console.log(result);
            //TODO: ex. storeに送信, DB保存,...
        }).catch(error => {
            console.log(error);
        });
    }

    // サインアウト処理
    public logout = () => {
        firebase.auth().signOut()
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    get firestore() {
        return firebase.firestore();
    }
}

export default new UserStore();