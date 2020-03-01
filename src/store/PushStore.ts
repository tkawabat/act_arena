import Moment from 'moment';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { observable, computed, action } from 'mobx';
import { Platform, Alert, } from 'react-native';

import * as Permissions from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';


import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';
import Secret from './../lib/Secret';

import ConfigStore from './ConfigStore';

import PushModel from '../model/PushModel';
import Scheduler from '../lib/Scheduler';


class PushStore {
    private model: PushModel;
    private token: string;

    private permission: boolean;
    @observable temporarySettingOnOff:boolean;
    @observable temporarySettingTime:Moment.Moment;

    @observable settingModal:boolean = false;
    @observable basicSettings:Array<C.PushBasicSettingKey>;
    

    @computed
    get onoff() :boolean {
        if (!this.permission) return false;
        if (this.temporarySettingTime > Moment()) {
            return this.temporarySettingOnOff;
        }
        if (this.basicSettings && this.basicSettings.length > 0) return true;
        return false;
    }

    @computed
    get temporarySettingString() :string {
        if (this.temporarySettingTime <= Moment()) {
            return null;
        }

        const onoff = this.temporarySettingOnOff ? 'ON' : 'OFF';
        return this.temporarySettingTime.format('hh:mm')+' まで'+onoff;
    }

    constructor() {
        if (Platform.OS === 'ios') {
            PushNotification.configure({
                senderID: Secret.push.fcm,
                permissions: {
                  alert: true,
                  badge: true,
                  sound: true
                },
                popInitialNotification: true,
                requestPermissions: true
              });
        }
        messaging().requestPermission();

        this.basicSettings = [];
        this.temporarySettingOnOff = false;
        this.temporarySettingTime = Moment().add(1, 'hours');
    }

    @action
    public updated = (snapshot:FirebaseFirestoreTypes.DocumentSnapshot) :void => {
        const data = snapshot.data();
        if (!data) return;
        this.token = data.token;
        this.basicSettings = data.basicSettings as Array<C.PushBasicSettingKey>;
        this.temporarySettingOnOff = data.temporarySettingOnOff;
        this.temporarySettingTime = Moment.unix(data.temporarySettingTime.seconds);
    }

    public asyncInit = async (userId:string) => {
        this.model = new PushModel(userId);

        this.model.asyncGet().then(async (snapshot) => {
            if (!snapshot || !(snapshot as FirebaseFirestoreTypes.DocumentSnapshot).exists) {
                await this.asyncCreate();
                snapshot = await this.model.asyncGet();
            }
            this.updated(snapshot as FirebaseFirestoreTypes.DocumentSnapshot);
            this.model.observe(this.updated);

            this.asyncUpdateToken();

            this.permission = await this.asyncCheckPermission();

            ConfigStore.setInitLoadComplete('push');
        })
    }

    public asyncUpdateToken = async () => {
        messaging().getToken()
        .then((token) => {
            if (this.token === token) return;
            this.model.asyncUpdateToken(token);
        })
        .catch((error) => {Amplitude.error('PushModle messaging().getToken', {})})
    }

    public asyncCreate = async () => {
        const token = await messaging().getToken();
        this.model.asyncCreate(token);
    }

    public asyncCheckPermission = async () :Promise<boolean> => {
        return messaging().hasPermission();
    }

    public asyncRequestPermission = async () :Promise<void> => {
        Permissions.requestNotifications(['alert', 'badge', 'sound']);
        Alert.alert('', '通知設定を許可してください。', [
            { text: '設定へ', onPress: Permissions.openSettings }
            , { text: 'Cancel' }
            ]);
    }

    public viewSettingModal = async () => {
        this.permission = await this.asyncCheckPermission();
        if (this.permission) {
            this.settingModal = true;
            Amplitude.info('PushModalOpen', null);
        } else {
            this.asyncRequestPermission();
        }
    }

    public hideSettingModal = () => {
        this.settingModal = false;
    }

    public toggleBasicSetting = (key:C.PushBasicSettingKey) => {
        let settings;
        if (this.basicSettings.includes(key)) {
            settings = this.basicSettings.filter(n => n !== key);
        } else {
            settings = this.basicSettings.concat([key]);
        }
        
        ConfigStore.load(true);
        Scheduler.setTimeout('', () => {
            this.model.asyncUpdateBasicSettings(settings);
            ConfigStore.load(false);            
        }, 500);
    }

    public updateTemporarySetting = (onoff:boolean, time:number) => {
        ConfigStore.load(true);
        Scheduler.setTimeout('', () => {
            this.model.asyncUpdateTemporarySetting(onoff, time);
            ConfigStore.load(false);            
        }, 500);
    }
}

export default new PushStore();