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

    public asyncGet = async (id:number) :Promise<void | Firebase.firestore.QueryDocumentSnapshot> => {
        return this.db
            .where('id', '==', id)
            .get()
            .then((snapshot :Firebase.firestore.QuerySnapshot) => {
                if (snapshot.size < 1) {
                    Amplitude.error('ArenaStore get', {'id':id});
                    return;
                }

                this.ref = snapshot.docs[0].ref;
                return snapshot.docs[0];
            })
            .catch((error) => Amplitude.error('ArenaStore get', error))
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