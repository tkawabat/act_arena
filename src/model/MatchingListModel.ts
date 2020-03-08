import Moment from 'moment';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';


import { User } from '../store/UserStore';

class MatchingListModel {
    private db:FirebaseFirestoreTypes.CollectionReference;
    private ref:FirebaseFirestoreTypes.DocumentReference;
    private unsubscribe:Function;

    get id() :string {
        return this.ref.id;
    }

    constructor() {
        this.db = Firebase.firestore().collection('MatchingList');
    }

    public asyncSet = async (user: User): Promise<void> => {
        return this.db.doc(user.id).set({
            name: user.name,
            gender: user.gender,
        })
        .catch((error) => Amplitude.error('MatchingListModel asyncSet', error))
        ;
    }

    public asyncDelete = async (user: User): Promise<void> => {
        return this.db.doc(user.id).delete()
        .catch((error) => Amplitude.error('MatchingListModel asyncDelete', error))
        ;
    }
}


export default MatchingListModel;