import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';

import { User } from '../store/UserStore';


export interface TheaterUser {
    name: string
    gender: C.Gender
    state: C.ArenaUserState
    next: C.TheaterState
}

class TheaterUserModel {
    private ref:FirebaseFirestoreTypes.CollectionReference;
    private unsubscribe:Function;

    constructor (theaterRef:FirebaseFirestoreTypes.DocumentReference) {
        this.ref = theaterRef.collection('RoomUser');
    }

    public asyncSetRoomUser = async (user:User) :Promise<void> => {
        return this.ref.doc(user.id).set({
            name: user.name,
            gender: user.gender,
            next: C.TheaterState.UNSET,
        })
        .catch((error) => Amplitude.error('TheaterUserModel.asyncSetRoomUser', error))
        ;
    }

    public asyncUpdateNext = async (user:User, next:C.TheaterState) :Promise<void> => {
        return this.ref.doc(user.id).update({
            next: next
        })
        .catch((error) => Amplitude.error('TheaterUserModel.asyncUpdateNext', error))
        ;
    }

    public asyncDelete = async (user:User) :Promise<void> => {
        return this.ref.doc(user.id).delete()
            .catch((error) => Amplitude.error('TheaterUserModel.asyncDelete', error))
        ;
    }

    public observe = (updated:(snapshot :FirebaseFirestoreTypes.QuerySnapshot) => void) => {
        this.unsubscribe = this.ref.onSnapshot(updated);
    }

    public stopObserve = () => {
        this.unsubscribe();
    }
}


export default TheaterUserModel;