import firebase from 'firebase';
import 'firebase/firestore';

import Secret from './Secret';


firebase.initializeApp(Secret.firebase);

export default firebase;