import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';

import { User } from '../store/UserStore';


export interface ArenaUser {
    name: string
    gender: C.Gender
    iconUrl: string
    state: C.ArenaUserState
}

class ArenaUserModel {
    private ref:FirebaseFirestoreTypes.CollectionReference;
    private unsubscribe:Function;

    public constructor (arenaRef:FirebaseFirestoreTypes.DocumentReference) {
        this.ref = arenaRef.collection('RoomUser');
    }

    public asyncSetRoomUser = async (user:User) :Promise<void> => {
        return this.ref.doc(user.id).set({
            name: user.name,
            gender: user.gender,
            state: C.ArenaUserState.LISTNER,
        })
        .catch((error) => Amplitude.error('ArenaStore join add user', error))
        ;
    }

    public asyncUpdateState = async (user:User, state:C.ArenaUserState) :Promise<void> => {
        return this.ref.doc(user.id).update({
            state: state
        })
        .catch((error) => Amplitude.error('ArenaStore entry', error))
        ;
    }

    public asyncDelete = async (user:User) :Promise<void> => {
        return this.ref.doc(user.id).delete()
            .catch((error) => Amplitude.error('ArenaStore leave', error))
        ;
    }

    public observe = (updated:(snapshot :FirebaseFirestoreTypes.QuerySnapshot) => void) => {
        this.unsubscribe = this.ref.onSnapshot(updated);
    }

    public stopObserve = () => {
        this.unsubscribe();
    }
}


export default ArenaUserModel;