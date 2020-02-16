import Moment from 'moment';
import { Platform, } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as Permissions from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import { observable, computed, action } from 'mobx';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';


class PushStore {

    // @observable onoff:boolean = false;
    @observable settingModal:boolean = false;
    @observable basicSettings:Array<C.PushBasicSettingKey>;
    private temporarySettingOnOff:boolean;
    private temporarySettingTime:Moment.Moment;

    @computed
    get onoff() :boolean {
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
        // TODO
        this.basicSettings = [];
        this.temporarySettingOnOff = false;
        this.temporarySettingTime = Moment().add(1, 'hours');
    }

    public viewSettingModal = () => {
        this.settingModal = true;
    }

    public hideSettingModal = () => {
        this.settingModal = false;
    }

    public toggleBasicSetting = (key:C.PushBasicSettingKey) => {
        if (this.basicSettings.includes(key)) {
            this.basicSettings = this.basicSettings.filter(n => n !== key);
        } else {
            this.basicSettings.push(key);
        }
    }

    public update = () => {

    }
    
    public registerForPushNotificationsAsync = async () => {        
        if (Platform.OS === 'ios') {
            await PushNotificationIOS.checkPermissions(async (permissions) => {
                await PushNotificationIOS.requestPermissions(permissions);
            });
            await Permissions.requestNotifications(['alert', 'badge', 'sound']);
        }


        console.log('permission:', await messaging().hasPermission());
        await messaging().registerForRemoteNotifications();
        await messaging().requestPermission();
        const token = await messaging().getToken();
        console.log('token:', token);

        const onMessageReceived = async (message) => {
            alert(`Hello`); // Hello world!
        }
        messaging().onMessage(onMessageReceived);
        messaging().setBackgroundMessageHandler(onMessageReceived);
            // await Permissions.checkNotifications();
            // await Permissions.requestNotifications(['alert', 'sound']).then((v) => {
            //     console.log('v:', v);
            // });


            //const token = await Notifications.getExpoPushTokenAsync();
            // const token = await Notifications.getDevicePushTokenAsync({
            //     gcmSenderId: '798603488350'
            // });

            // Notifications.addListener((notification) => {
            //     if(notification.origin === 'selected'){
            //       //バックグラウンドで通知
            //     }else if(notification.origin === 'received'){
            //       //フォアグラウンドで通知
            //       alert('通知が来ました:' + notification.data.name);
            //       console.log(notification.data.name);
            //     }
            //   });

            // //alert("token=" + token);
            // console.log(token);
    }

}

export default new PushStore();