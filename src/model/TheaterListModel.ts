import Moment from 'moment';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';

import { Theater } from './TheaterModel';


class TheaterListModel {
    private db:FirebaseFirestoreTypes.CollectionReference;
    private query:FirebaseFirestoreTypes.Query;
    private unsubscribe:Function;

    constructor() {
        this.db = Firebase.firestore().collection('Theater');
        this.query = this.db.orderBy('createdAt', 'desc').limit(10);
    }

    public observe = (updated:(snapshot :FirebaseFirestoreTypes.QuerySnapshot) => void) => {
        this.unsubscribe = this.query.onSnapshot(updated);
    }

    public stopObserve = () => {
        this.unsubscribe();
    }
}


export default TheaterListModel;