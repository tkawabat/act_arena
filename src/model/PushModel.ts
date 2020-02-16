import Moment from 'moment';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';


class PushModel {
    private db:FirebaseFirestoreTypes.CollectionReference;
    private ref:FirebaseFirestoreTypes.DocumentReference;
    private unsubscribe:Function;

    constructor(userId:string) {
        this.db = Firebase.firestore().collection('Push');
        this.ref = this.db.doc(userId);
    }

    public asyncCreate = async (token:string) :Promise<void> => {
        Amplitude.info('PushCreate', null);
        const push = {
            token: token,
            basicSettings: [
                C.PushBasicSettingKey.EVENING,
                C.PushBasicSettingKey.NIGHT,
            ],
            temporarySettingOnOff: false,
            temporarySettingTime: Firebase.firestore.Timestamp.now(),
            createdAt: Firebase.firestore.Timestamp.now(),
            updatedAt: Firebase.firestore.Timestamp.now(),
        }

        return this.ref.set(push)
            .catch((error) => Amplitude.error('PushStore asyncCreate', error))
            ;

    }

    public asyncUpdateBasicSettings = async (basicSettings:Array<C.PushBasicSettingKey>) :Promise<void> => {
        Amplitude.info('PushUpdateBasicSetting', null);
        const push = {
            basicSettings: basicSettings,
            updatedAt: Firebase.firestore.Timestamp.now(),
        };

        return this.ref.update(push)
            .catch((error) => Amplitude.error('PushStore asyncUpdateBasicSetting', error))
            ;
    }

    public asyncUpdateTemporarySetting = async (onoff:boolean, time:number) :Promise<void> => {
        Amplitude.info('PushUpdateTemporarySetting', null);
        const t = Firebase.firestore.Timestamp.fromDate(Moment().add(time, 'hour').toDate());
        const push = {
            temporarySettingOnOff: onoff,
            temporarySettingTime: t,
            updatedAt: Firebase.firestore.Timestamp.now(),
        };

        return this.ref.update(push)
            .catch((error) => Amplitude.error('PushStore asyncUpdateTemporarySetting', error))
            ;
    }

    public asyncGet = async () :Promise<void | FirebaseFirestoreTypes.DocumentSnapshot> => {
        return this.ref.get()
            .catch((error) => Amplitude.error('PushStore asyncGet', error))
            ;
    }

    public observe = (updated:(snapshot :FirebaseFirestoreTypes.DocumentSnapshot) => void) => {
        this.unsubscribe = this.ref.onSnapshot(updated);
    }

    public stopObserve = () => {
        this.unsubscribe();
    }
}


export default PushModel;