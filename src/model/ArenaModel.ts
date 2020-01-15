import Moment from 'moment';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';


class ArenaModel {
    private db:Firebase.firestore.CollectionReference;
    private ref:Firebase.firestore.DocumentReference;
    private unsubscribe:Function;

    get id() :string {
        return this.ref.id;
    }

    constructor() {
        this.db = Firebase.firestore().collection('Arena');
    }

    public asyncCreate = async (id:number) :Promise<void> => {
        const endAt = [];
        const t = Firebase.firestore.Timestamp.fromDate(Moment().add(-1, 'seconds').toDate());
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
            createdAt: Firebase.firestore.Timestamp.now(),
            updatedAt: Firebase.firestore.Timestamp.now(),
        };

        return this.db.doc(id.toString()).set(arena)
        .catch((error) => Amplitude.error('ArenaStore create', error))
        ;
    }

    public asyncGet = async (id:number, createIfNull:boolean) :Promise<void | Firebase.firestore.QueryDocumentSnapshot> => {
        return this.db
            .doc(id.toString()).get()
            .then(async (snapshot :Firebase.firestore.DocumentSnapshot) => {
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

    public observe = (updated:(snapshot :Firebase.firestore.DocumentSnapshot) => void) => {
        this.unsubscribe = this.ref.onSnapshot(updated);
    }

    public stopObserve = () => {
        this.unsubscribe();
    }
}


export default ArenaModel;