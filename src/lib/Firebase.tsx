import firebase from 'firebase';
import 'firebase/firestore';

import Secret from './Secret';


!firebase.apps.length ? firebase.initializeApp(Secret.firebase) : firebase.app();

export default firebase;