import Moment from 'moment';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
import Secret from '../lib/Secret';
import Firebase from '../lib/Firebase';
import Navigator from '../lib/Navigator';

import SkywayStore from './SkywayStore';


class ConfigStore {
    private ref:Firebase.firestore.DocumentReference;

    // db
    private maintenance:string = '';
    private version:string = '0.0.0';

    // no db
    @observable font:boolean = false;
    @observable skyway:boolean = false;
    @observable user:boolean = false;
    @observable config:boolean = false;

    @observable isLoad:boolean = false;
    @observable message:string = '';

    @computed get isInitLoaded() {
        return this.font && this.skyway && this.user && this.config;
    }

    constructor() {
        this.ref = Firebase.firestore().collection('Config').doc(C.CONFIG_ID);
        this.ref.onSnapshot(this.setSnapshot2field);
        this.ref.get().then((snapshot) => {
            this.setSnapshot2field(snapshot);
            this.config = true;
        });
    }

    private mustUpdate = () :boolean => {
        return Secret.version < this.version;
    }

    @action
    private setSnapshot2field = (doc:Firebase.firestore.DocumentSnapshot) => {
        const data = doc.data();
        if (!data) return;

        this.maintenance = data.maintenance;
        this.version = data.version;
        if (this.maintenance !== '') {
            this.message = 'ただいまメンテナンス中です。';
            SkywayStore.disconnect();
            Navigator.navigate('Text', null);
        } else if (this.mustUpdate()) {
            this.message = '新しいバージョンのアプリがあります。アップデートしてください。';
            SkywayStore.disconnect();
            Navigator.navigate('Text', null);
        }
    }

    @action load = (load:boolean) => {
        this.isLoad = load;
    }
}


export default new ConfigStore();