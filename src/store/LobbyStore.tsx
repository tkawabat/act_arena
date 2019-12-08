import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';

import ArenaModel from '../model/ArenaModel';
import ArenaUserModel, { ArenaUser} from '../model/ArenaUserModel';

import ConfigStore from './ConfigStore';
import UserStore from './UserStore';


class LobbyStore {
    private arenaModel:ArenaModel;
    private arenaUserModel:ArenaUserModel;

    private arenaId:number;

    @observable users:{ [id:string]:ArenaUser} = {};

    @computed get userNum() {
        if (!this.users) return 0;
        return Object.keys(this.users).length;
    }

    constructor() {
        this.arenaModel = new ArenaModel();
    }

    private arenaUserUpdated = (snapshot :Firebase.firestore.QuerySnapshot) => {
        const users = {};
        snapshot.docs.map((doc) => {
            users[doc.id] = doc.data() as ArenaUser;
        });
        this.users = users;
        ConfigStore.setInitLoadComplete('lobby');
    }

    public asyncInit = async (arenaId:number) :Promise<void> => {
        this.arenaId = arenaId;

        if (this.arenaUserModel) {
            this.arenaUserModel.stopObserve();
        }

        return this.arenaModel.asyncGet(this.arenaId)
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