import Moment from 'moment';
import { Platform, Linking } from 'react-native';
import VersionNumber from 'react-native-version-number';
import { observable, computed, action } from 'mobx';
import { Updates } from 'expo';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';


class ConfigStore {
    private ref:Firebase.firestore.DocumentReference;

    private checkingExpoUpdate = false;

    @observable requireVersion:string = '0.0.0';
    @observable init = {
        'init': false,
    };

    @observable isLoad:boolean = false;
    //@observable mustUpdate:boolean = false;
    @observable expoReload:boolean = false;
    @observable message:string = '';

    @computed get isInitLoaded() :boolean {
        for (const key in this.init) {
            if (!this.init[key]) return false;
        }
        return true;
    }

    @computed get mustUpdate() :boolean {
        if (!this.isInitLoaded) return false; // for ios
        return VersionNumber.appVersion < this.requireVersion;
    }

    constructor() {
        this.setInitLoad('config');
        this.ref = Firebase.firestore().collection('Config').doc(C.ConfigId);
        this.ref.onSnapshot(this.setSnapshot2field);
        this.ref.get().then((snapshot) => {
            this.setSnapshot2field(snapshot);
            this.setInitLoadComplete('config');
        });
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

        this.message = data.maintenance as string;
        this.requireVersion = Platform.OS === 'ios' ? data.iosVersion : data.androidVersion;
    }

    @action
    public load = (load:boolean) => {
        this.isLoad = load;
    }

    public checkExpoUpdates = async () => {
        if (this.checkingExpoUpdate) return;

        this.checkingExpoUpdate = true;

        const update = await Updates.checkForUpdateAsync()
            .catch(() => { })
            ;

        if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            this.expoReload = true;
        }
        this.checkingExpoUpdate = false;
    }
}


export default new ConfigStore();