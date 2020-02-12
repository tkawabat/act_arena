import { Notifications } from 'expo';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as Permissions from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import { Platform, NativeModules } from 'react-native';

//const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

// export const registerForPushNotificationsAsync = async () => {

//     const { status: existingStatus } = await Permissions.getAsync(
//       Permissions.NOTIFICATIONS
//     );
//     let finalStatus = existingStatus;
  
//     // パーミッションがとれてないときだけ聞く
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
  
//     // パーミッションを許可しなかった場合はreturn
//     if (finalStatus !== 'granted') {
//         console.log('finalStatus:', finalStatus);
//         return;
//     }
  
//     // Expoプッシュトークンを取得
//     let token = await Notifications.getExpoPushTokenAsync();
//     console.log('token:', token);
// }

// export const firebase_notification = async () {
//     // パーミッションを要求（iOS）
//     await Firebase.messaging().requestPermission();
  
//     // デバイストークンを取得
//     Firebase
//       .messaging()
//       .getToken()
//       .then(fcmToken => {
//         console.log(fcmToken)
//       })
  
//     // 新しいトークンの生成がされた時
//     this.onTokenRefreshListener = Firebase
//       .messaging()
//       .onTokenRefresh(fcmToken => {
//         console.log(fcmToken)
//       })
  
//     // ① プッシュ通知を押してクローズからの起動
//     const notificationOpen: NotificationOpen = await Firebase
//       .notifications()
//       .getInitialNotification()
  
//     if (notificationOpen) {
//       console.log(notificationOpen)
//     }
  
//     // ② プッシュ通知を押してバックグラウンドからの復帰
//     this.notificationOpenedListener = Firebase
//       .notifications()
//       .onNotificationOpened(notificationOpen => {
//         console.log(notificationOpen)
//       })
  
//     // ③ アプリが起動中にプッシュ通知が来た時
//     this.notificationListener = Firebase
//       .notifications()
//       .onNotification(notification => {
//         console.log(notification)
//       })
//   }

//取得のためのコード
export const registerForPushNotificationsAsync = async () => {

    try {
        await PushNotificationIOS.checkPermissions(async (permissions) => {
            console.log('permissions:', permissions);
            await PushNotificationIOS.requestPermissions(permissions);
        });
        await Permissions.requestNotifications(['alert', 'badge', 'sound']);
       
       
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
    } catch (e) {
        console.log(e);
    }
}

// PushNotification.configure({
//     // (optional) Called when Token is generated (iOS and Android)
//     onRegister: function(token) {
//       console.log("TOKEN:", token);
//     },
  
//     // (required) Called when a remote or local notification is opened or received
//     onNotification: function(notification) {
//       console.log("NOTIFICATION:", notification);
  
//       // process the notification
  
//       // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
//       notification.finish(PushNotificationIOS.FetchResult.NoData);
//     },
  
//     // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
//     senderID: '798603488350',
  
//     // IOS ONLY (optional): default: all - Permissions to register.
//     permissions: {
//       alert: true,
//       badge: true,
//       sound: true
//     },
  
//     // Should the initial notification be popped automatically
//     // default: true
//     popInitialNotification: true,
  
//     /**
//      * (optional) default: true
//      * - Specified if permissions (ios) and token (android and ios) will requested or not,
//      * - if not, you must call PushNotificationsHandler.requestPermissions() later
//      */
//     requestPermissions: true
//   });

// PushNotification.localNotificationSchedule({
//     //... You can use all the options from localNotifications
//     message: "My Notification Message", // (required)
//     date: new Date(Date.now() + 5 * 1000) // in 60 secs
//   });