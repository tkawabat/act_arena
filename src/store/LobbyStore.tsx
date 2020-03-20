import { observable, computed, action } from 'mobx';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';

import ArenaModel from '../model/ArenaModel';
import ArenaUserModel, { ArenaUser} from '../model/ArenaUserModel';
import { Theater } from '../model/TheaterModel';
import TheaterListModel from '../model/TheaterListModel';

import ConfigStore from './ConfigStore';



class LobbyStore {
    private arenaModel:ArenaModel;
    private arenaUserModel:ArenaUserModel;
    private theaterListModel:TheaterListModel;

    private arenaId:number;

    @observable users:{ [id:string]:ArenaUser} = {};
    @observable theaters: Theater[];

    @computed get userNum() {
        if (!this.users) return 0;
        return Object.keys(this.users).length;
    }

    constructor() {
        this.arenaModel = new ArenaModel();
        this.theaterListModel = new TheaterListModel();
    }

    private arenaUserUpdated = (snapshot :FirebaseFirestoreTypes.QuerySnapshot) => {
        const users = {};
        snapshot.docs.map((doc) => {
            users[doc.id] = doc.data() as ArenaUser;
        });
        this.users = users;
        ConfigStore.setInitLoadComplete('lobby');
    }

    private theaterListUpdated = (snapshot :FirebaseFirestoreTypes.QuerySnapshot) => {
        this.theaters = snapshot.docs.map((v) => v.data() as Theater)
    }

    public asyncInit = async (arenaId:number) :Promise<void> => {
        this.arenaId = arenaId;

        if (this.arenaUserModel) {
            this.arenaUserModel.stopObserve();
        }

        this.theaterListModel.observe(this.theaterListUpdated);

        this.arenaModel.asyncGet(this.arenaId, false)
            .then((arenaRef) => {
                if (!arenaRef) {
                    alert('エラーが発生しました。');
                    return;
                }
                this.arenaUserModel = new ArenaUserModel(arenaRef.ref);
                this.arenaUserModel.observe(this.arenaUserUpdated);
        });
    }
}


export default new LobbyStore();