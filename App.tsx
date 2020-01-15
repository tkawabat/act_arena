import * as Push from './src/lib/Push';
Push.registerForPushNotificationsAsync();

// import StorybookUI from './storybook';
// export default StorybookUI;

import React, { Component } from 'react';
import { StyleSheet, YellowBox, AppState, Dimensions, Alert, View, Text, Linking, Platform } from 'react-native';
import { Sentry } from 'react-native-sentry';
import { Updates, SplashScreen, } from 'expo';
import * as Font from 'expo-font';
Sentry.config('https://8d1598d88afe47cb857fe4f49ff829f2@sentry.io/1500544').install();
import { observer } from 'mobx-react';
import Moment from 'moment';

import AppContainer from './src/component/screen/AppContainer';
import * as C from './src/lib/Const';
import Amplitude from './src/lib/Amplitude';
import Firebase from './src/lib/Firebase';
import Navigator from './src/lib/Navigator';

import ConfigStore from './src/store/ConfigStore';
import LobbyStore from './src/store/LobbyStore';
import UserStore from './src/store/UserStore';
import SkywayStore from './src/store/SkywayStore';


@observer
export default class App extends Component {

    constructor(props) {
        super(props);

        const ignoreWarnings = ['Setting a timer for a long period of time,'];
        YellowBox.ignoreWarnings(ignoreWarnings);
        console.ignoredYellowBox = ignoreWarnings;

        Amplitude.info('init', null);

        SplashScreen.preventAutoHide();
        
        ConfigStore.setInitLoad('font');
        ConfigStore.setInitLoad('skyway');
        ConfigStore.setInitLoad('user');
        ConfigStore.setInitLoad('lobby');
        ConfigStore.setInitLoadComplete('init');

        Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        }).then(() => {
            ConfigStore.setInitLoadComplete('font');
        });

        UserStore.anonymousLogin().then((user) => {
            if (!user) {
                alert('ユーザー情報の取得に失敗しました。');
            }
            const userId = (user as Firebase.auth.UserCredential).user.uid;
            //SkywayStore.connect(userId);
            SkywayStore.connect(userId + Moment().unix().toString());
            LobbyStore.asyncInit(0);
        });
    }

    private handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            ConfigStore.checkExpoUpdates();
        }
    }

    private requireAlert = (message: string, text: string, onPress: () => void) => {
        setTimeout(() => {
            Alert.alert(
                '', message,
                [{
                    text: text,
                    onPress: onPress
                }], { cancelable: false }
            )
        }, 700);
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        ConfigStore.checkExpoUpdates();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    componentDidUpdate() {
        if (ConfigStore.expoReload) {
            this.requireAlert('アップデートがあります。アプリを再起動してください。', '再起動', () => {
                Updates.reloadFromCache();
            });
        }

        if (ConfigStore.mustUpdate) {
            this.requireAlert('新しいバージョンアプリがあります。アプリをダウンロードしてください。', 'ストアへ行く', () => {
                Linking.openURL(C.AppStoreUrl[Platform.OS])
                    .catch((error) => Amplitude.error('App open app store', error))
            });
        }
    }

    render() {
        if (!ConfigStore.isInitLoaded) {
            return null;
        }
        SplashScreen.hide();

        if (ConfigStore.message !== '') {
            return (
                <View style={styles.root}>
                    <Text style={styles.text}>{ConfigStore.message}</Text>
                </View>
            )
        }

        return (
            <AppContainer ref={(nav) => {
                Navigator.setNavigator(nav);
                const initailScreen = UserStore.isRegisted ? 'Lobby' : 'Register';
                Navigator.navigate(initailScreen, null);
            } } />
        );
    }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    root: {
        height: height,
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '400',
    },
});