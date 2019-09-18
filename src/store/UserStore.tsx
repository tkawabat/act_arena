import { observable, computed } from 'mobx';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';
import Navigator from '../lib/Navigator';
import ConfigStore from './ConfigStore';


export interface User {
    id: string
    name: string
    gender: C.Gender
    iconUrl: string
    // createdAt: Firebase.firestore.FieldValue
    // updatedAt: Firebase.firestore.FieldValue
}

class UserStore implements User {
    @observable id:string;
    @observable name:string;
    @observable gender: C.Gender;
    @observable iconUrl: string;
    createdAt: Firebase.firestore.FieldValue;
    updatedAt: Firebase.firestore.FieldValue;

    @computed get isRegisted() :boolean {
        return this.name ? true : false;
    }

    // private providerTwitter;
    private db:Firebase.firestore.CollectionReference;
    private userStatusDatabaseRef:Firebase.database.Reference;
    private onSnapshot;

    constructor() {
        this.db = Firebase.firestore().collection('User');
        // this.providerTwitter = new Firebase.auth.TwitterAuthProvider();

        // サインインしているかどうかの判定
        Firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                return;
            }

            this.id = user.uid;
            Amplitude.setUserId(this.id);
            Amplitude.info('login', null);

            if (this.onSnapshot) this.onSnapshot(); // delete old listener
            this.onSnapshot = this.db.doc(this.id).onSnapshot(this.setSnapshot2field);

            this.get(this.id).then(() => {ConfigStore.user = true;})

            this.userStatusDatabaseRef = Firebase.database().ref('/status/' + this.id);
        });
    }
     
    private get = async (uid:string) :Promise<void> => {
        return this.db
            .doc(this.id)
            .get()
            .then(this.setSnapshot2field)
            .catch((error) => Amplitude.error('UserStore get', error))
            ;
    }

    private setSnapshot2field = (doc:Firebase.firestore.DocumentSnapshot) => {
        const data = doc.data();
        if (!data) return;

        this.name = data.name;
        this.gender = data.gender;
        this.iconUrl = data.iconUrl;
    }

    public asyncSetConnect = (connect:boolean) => {
        return this.userStatusDatabaseRef.set({
            state: connect ? 1 : 0
            , updated: Firebase.database.ServerValue.TIMESTAMP
        })
        .catch((error) => Amplitude.error('UserStore asyncSetConnect', error))
        ;
    }

    public observeConnectionChange = () => {
        Firebase.database().ref('.info/connected').on('value', (snapshot) => {
            if (snapshot.val() == false) {
                this.asyncSetConnect(false);
                return;
            };

            const offline = {
                state: 0
                , updated: Firebase.database.ServerValue.TIMESTAMP
            }

            this.userStatusDatabaseRef.onDisconnect().set(offline).then(() => {
                this.asyncSetConnect(true);
            });
        });
    }

    public stopObserveConnectionChange = () => {
        Firebase.database().ref('.info/connected').off('value');
    }

    public set = async (name:string, gender:number) :Promise<void> => {
        Amplitude.info('set user', {name:name, gender:gender});
        return this.db.doc(this.id).set({
            name: name
            , gender: gender
            , createdAt: Firebase.firestore.FieldValue.serverTimestamp()
            , updatedAt: Firebase.firestore.FieldValue.serverTimestamp()
        }, {merge: true})
        .then(() => { Navigator.navigate('Lobby', null)})
        .catch((error) => Amplitude.error('UserStore set', error))
        ;
    }

    public asyncSetRoom = async (id:string) :Promise<void> => {
        return this.db.doc(this.id).update({
            arena: id
        })
        .catch((error) => Amplitude.error('UserStore setRoom', error))
        ;
    }

    public anonymousLogin = async () :Promise<void | Firebase.auth.UserCredential> => {
        return Firebase.auth().signInAnonymously()
            .catch((error) => Amplitude.error('UserStore anonymousLogin', error))
            ;
    }

    // public signup(email, password) {
    //     Firebase.auth().createUserWithEmailAndPassword(email, password)
    //         .then(user => {
    //             if (user) {
    //                 console.log("Success to Signup")
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

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