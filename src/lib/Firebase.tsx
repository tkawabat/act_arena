import firebase from 'firebase';
import secret from '../../secret.json';


class Firebase {
    private providerTwitter;

    constructor() {
        firebase.initializeApp(secret.firebase);
        //firebase.firestore().settings({ timestampsInSnapshots: true });

        // サインインしているかどうかの判定
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                // サインイン中でない
                console.log('Not sign in')
            } else {
                // サインイン中。画面遷移などの処理をする。
                console.log('Signed in');
                console.log(user);
            }
        })

        // サインインしているかどうかの判定２
        //const currentUser = firebase.auth().currentUser;
        this.providerTwitter = new firebase.auth.TwitterAuthProvider();
        
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
}

export default new Firebase();