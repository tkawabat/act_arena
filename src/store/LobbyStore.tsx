import Moment from 'moment';
import { observable, computed, action } from 'mobx';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { showMessage, } from "react-native-flash-message";

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';

import ArenaModel from '../model/ArenaModel';
import ArenaUserModel, { ArenaUser} from '../model/ArenaUserModel';
import { Theater } from '../model/TheaterModel';
import TheaterListModel from '../model/TheaterListModel';

import ConfigStore from './ConfigStore';
import UserStore from './UserStore';
import TheaterStore from './TheaterStore';
import ArenaStore from './ArenaStore';
import Scheduler from '../lib/Scheduler';
import SoundStore from './SoundStore';


class LobbyStore {
    private arenaModel:ArenaModel;
    private arenaUserModel:ArenaUserModel;
    private theaterListModel:TheaterListModel;

    private arenaId:number;

    @observable users:{ [id:string]:ArenaUser} = {};
    @observable theaters: {
        [id:string]: Theater
    };

    @computed get userNum() {
        if (!this.users) return 0;
        return Object.keys(this.users).length;
    }

    @computed get actTheaterId():string {
        if (!this.theaters) return undefined;

        const now = Moment().unix();
        const pair = Object.entries(this.theaters).find(([id, theater]) => {
            if (theater.endAt[C.TheaterState.ACT].seconds < now) return false;
            return theater.characters.findIndex((c) => c.user === UserStore.id) !== -1;
        });
        if (!pair) return undefined;
        return pair[0];
    }

    constructor() {
        this.arenaModel = new ArenaModel();
        this.theaterListModel = new TheaterListModel();
    }

    private showmessage = (theaterId:string) => {
        const f = () => {
            SoundStore.se(C.SeKey.MATCHING);
            showMessage({
                autoHide: false,
                message: 'マッチングしました！　⇛長押しして入室。',
                titleStyle: { fontSize: 16 },
                onLongPress: () => {
                    ArenaStore.leave();
                    TheaterStore.leave();
                    TheaterStore.join(theaterId);
                }
            });
        }

        if (ConfigStore.isInitLoaded) {
            f();
        } else {
            Scheduler.setTimeout('', f, 2000);
        }
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
        const beforeActTheaterId = this.actTheaterId;

        const theaters:{ [id:string]: Theater} = {} ;
        snapshot.docs.forEach((v:FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
            const id = v.id;
            theaters[id] = v.data() as Theater;
        });
        this.theaters = theaters;

        const afterActTheaterId = this.actTheaterId;
        if (typeof afterActTheaterId !== 'undefined' && beforeActTheaterId !== afterActTheaterId) {
            this.showmessage(afterActTheaterId);
        }
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