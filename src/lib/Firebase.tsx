import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import Secret from './Secret';

const Firebase = {
    database: database,
    firestore: firestore,
    auth: auth,
}
firebase.app();
//firebase.initializeApp(Secret.firebase.android);
//!firebase.apps.length ? firebase.initializeApp(Secret.firebase) : firebase.app();

export default Firebase