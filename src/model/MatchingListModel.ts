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

    constructor(userId: string) {
        this.db = Firebase.firestore().collection('MatchingList');
        this.ref = this.db.doc(userId);
    }

    public asyncSet = async (user: User): Promise<void> => {
        return this.ref.set({
            name: user.name,
            gender: user.gender,
            createdAt: Firebase.firestore.Timestamp.now(),
        })
        .catch((error) => Amplitude.error('MatchingListModel asyncSet', error))
        ;
    }

    public asyncDelete = async (): Promise<void> => {
        return this.ref.delete()
        .catch((error) => Amplitude.error('MatchingListModel asyncDelete', error))
        ;
    }

    public observe = (updated:(snapshot :FirebaseFirestoreTypes.DocumentSnapshot) => void) => {
        this.unsubscribe = this.ref.onSnapshot(updated);
    }

    public stopObserve = () => {
        this.unsubscribe();
    }
}


export default MatchingListModel;