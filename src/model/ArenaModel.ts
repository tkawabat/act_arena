import Moment from 'moment';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';


class ArenaModel {
    private db:FirebaseFirestoreTypes.CollectionReference;
    private ref:FirebaseFirestoreTypes.DocumentReference;
    private unsubscribe:Function;

    get id() :string {
        return this.ref.id;
    }

    constructor() {
        this.db = Firebase.firestore().collection('Arena');
    }

    public asyncCreate = async (id:number) :Promise<void> => {
        const endAt = [];
        const t = FirebaseFirestoreTypes.Timestamp.fromDate(Moment().add(-1, 'seconds').toDate());
        endAt[C.ArenaState.READ] = t;
        endAt[C.ArenaState.CHECK] = t;
        endAt[C.ArenaState.ACT] = t;

        const arena = {
            id: Number(id),
            state: C.ArenaState.WAIT,
            title: '',
            scenarioUrl: '',
            agreementUrl: '',
            agreementScroll: -1,
            characters: [],
            startText: '',
            endText: '',
            message: '',
            endAt: endAt,
            createdAt: FirebaseFirestoreTypes.Timestamp.now(),
            updatedAt: FirebaseFirestoreTypes.Timestamp.now(),
        };

        return this.db.doc(id.toString()).set(arena)
        .catch((error) => Amplitude.error('ArenaStore create', error))
        ;
    }

    public asyncGet = async (id:number, createIfNull:boolean) :Promise<void | FirebaseFirestoreTypes.QueryDocumentSnapshot> => {
        return this.db
            .doc(id.toString()).get()
            .then(async (snapshot :any) => {
                if (!snapshot.exists && createIfNull) {
                    await this.asyncCreate(id);
                    return await this.asyncGet(id, false);
                }
                if (!snapshot.exists && !createIfNull) {
                    Amplitude.error('ArenaStore getAsync', {'id':id});
                    return;
                }

                this.ref = snapshot.ref;
                return snapshot;
            })
            .catch((error) => Amplitude.error('ArenaStore getAsync', error))
            ;
    }

    public asyncAddActTime = async (endAt: Array<Moment.Moment>) :Promise<void> => {
        const endAtDate = [];
        const now = Moment();
        for (let [key, value] of endAt.entries()) {
            if (value < now) {
                endAtDate[key] = value.toDate(); // すでに終わったstateは更新しない。
            } else {
                endAtDate[key] = value.add(30, 'seconds').toDate();
            }
        }
        
        return this.ref.update({
            endAt: endAtDate
        })
        .catch((error) => Amplitude.error('ArenaModel add act time', error))
        ;
    }

    public observe = (updated:(snapshot :FirebaseFirestoreTypes.DocumentSnapshot) => void) => {
        this.unsubscribe = this.ref.onSnapshot(updated);
    }

    public stopObserve = () => {
        this.unsubscribe();
    }
}


export default ArenaModel;