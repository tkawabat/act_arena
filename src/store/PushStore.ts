import Moment from 'moment';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { observable, computed, action } from 'mobx';
import { Platform, Alert, } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as Permissions from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';

import ConfigStore from './ConfigStore';

import PushModel from '../model/PushModel';


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
        if (this.basicSettings.length > 0) return true;
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
            PushNotificationIOS.checkPermissions(async (permissions) => {
                await PushNotificationIOS.requestPermissions(permissions);
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
        messaging().getToken().then(token => console.log('token:', token));
        this.settingModal = false;
    }

    public toggleBasicSetting = (key:C.PushBasicSettingKey) => {
        let settings;
        if (this.basicSettings.includes(key)) {
            settings = this.basicSettings.filter(n => n !== key);
        } else {
            settings = this.basicSettings.concat([key]);
        }
        
        this.model.asyncUpdateBasicSettings(settings);
    }

    public updateTemporarySetting = (onoff:boolean, time:number) => {
        this.model.asyncUpdateTemporarySetting(onoff, time);
    }
}

export default new PushStore();