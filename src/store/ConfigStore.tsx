import Moment from 'moment';
import { Platform, Linking } from 'react-native';
import VersionNumber from 'react-native-version-number';
import { observable, computed, action } from 'mobx';
import { Updates } from 'expo';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';


class ConfigStore {
    private ref:FirebaseFirestoreTypes.DocumentReference;

    private checkingExpoUpdate = false;

    @observable requireVersion:string = '0.0.0';
    @observable init = {
        'init': false,
    };

    @observable isLoad:boolean = false;
    //@observable mustUpdate:boolean = false;
    @observable expoReload:boolean = false;
    @observable message:string = '';
    @observable notices:string[] = [];

    @computed get isInitLoaded() :boolean {
        for (const key in this.init) {
            if (!this.init[key]) return false;
        }
        return true;
    }

    @computed get mustUpdate() :boolean {
        if (!this.isInitLoaded) return false; // for ios
        
        const v1 = VersionNumber.appVersion.split('.');
        const v2 = this.requireVersion.split('.');
        const n = Math.max(v1.length, v2.length);

        for (let i = 0; i < n; i++) {
            const v1i = parseInt(v1.shift() || '0');
            const v2i = parseInt(v2.shift() || '0');
            if (v1i !== v2i) return v1i < v2i;
        }
        return false;
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
        if (this.init[name]) return; // 再設定はしない
        this.init[name] = false;
    }

    @action setInitLoadComplete = (name:string) :void => {
        Amplitude.info('init completed ' + name, null);
        this.init[name] = true;
    }

    @action
    private setSnapshot2field = (doc:FirebaseFirestoreTypes.DocumentSnapshot) => {
        const data = doc.data();
        if (!data) return;

        this.message = data.maintenance as string;
        this.notices = data.notices;
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

        if (update && update.isAvailable) {
            await Updates.fetchUpdateAsync();
            this.expoReload = true;
        }
        this.checkingExpoUpdate = false;
    }
}


export default new ConfigStore();