import Moment from 'moment';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';


export interface TheaterCharacter {
    name: string
    gender: number
    user: string
    userName: string
}
export interface Theater {
    title: string
    author: string
    scenarioUrl: string
    agreementUrl: string
    agreementScroll: number
    characters: Array<TheaterCharacter>
    message: string
    endAt: Array<FirebaseFirestoreTypes.Timestamp>
    createdAt: FirebaseFirestoreTypes.Timestamp
    updatedAt: FirebaseFirestoreTypes.Timestamp
}

class TheaterModel {
    private db:FirebaseFirestoreTypes.CollectionReference;
    private ref:FirebaseFirestoreTypes.DocumentReference;
    private unsubscribe:Function;

    constructor() {
        this.db = Firebase.firestore().collection('Theater');
    }

    public asyncGetById = async (id:string) :Promise<Theater|void> => {
        return this.db.doc(id).get()
            .then((snapshot) => {
                this.ref = snapshot.ref;
                return snapshot.data() as Theater;
            })
            .catch((error) => Amplitude.error('ArenaStore getAsync', error))
            ;
    }

    public observe = (updated:(snapshot :FirebaseFirestoreTypes.DocumentSnapshot) => void) => {
        this.unsubscribe = this.ref.onSnapshot(updated);
    }

    public stopObserve = () => {
        this.unsubscribe();
    }
}


export default TheaterModel;