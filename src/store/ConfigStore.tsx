import Moment from 'moment';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
import Secret from '../lib/Secret';
import Firebase from '../lib/Firebase';
import Navigator from '../lib/Navigator';


class ConfigStore {
    private ref:Firebase.firestore.DocumentReference;

    // db
    private maintenance:string = '';
    private version:string = '0.0.0';

    // no db
    @observable init = {
        'init': false,
    };

    @observable isLoad:boolean = false;
    @observable message:string = '';

    @computed get isInitLoaded() :boolean {
        for (const key in this.init) {
            if (!this.init[key]) return false;
        }
        return true;
    }

    constructor() {
        this.ref = Firebase.firestore().collection('Config').doc(C.ConfigId);
        this.ref.onSnapshot(this.setSnapshot2field);
        this.setInitLoad('config');
        this.ref.get().then((snapshot) => {
            this.setSnapshot2field(snapshot);
            this.setInitLoadComplete('config');
        });
    }

    private mustUpdate = () :boolean => {
        return Secret.version < this.version;
    }

    @action setInitLoad = (name:string) :void => {
        this.init[name] = false;
    }

    @action setInitLoadComplete = (name:string) :void => {
        this.init[name] = true;
    }

    @action
    private setSnapshot2field = (doc:Firebase.firestore.DocumentSnapshot) => {
        const data = doc.data();
        if (!data) return;

        this.maintenance = data.maintenance;
        this.version = data.version;
        if (this.maintenance !== '') {
            this.message = 'ただいまメンテナンス中です。';
            Navigator.navigate('Text', null);
        } else if (this.mustUpdate()) {
            this.message = '新しいバージョンのアプリがあります。アップデートしてください。';
            Navigator.navigate('Text', null);
        }
    }

    @action load = (load:boolean) => {
        this.isLoad = load;
    }
}


export default new ConfigStore();