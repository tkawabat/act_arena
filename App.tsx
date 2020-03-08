import * as Sentry from '@sentry/react-native';
Sentry.init({
    dsn: 'https://8d1598d88afe47cb857fe4f49ff829f2@sentry.io/1500544',
});

import { YellowBox, AppState, Dimensions, Alert, Linking, Platform } from 'react-native';
const ignoreWarnings = [
    'Setting a timer for a long period of time',
];
YellowBox.ignoreWarnings(ignoreWarnings);
console.disableYellowBox = true;
console.ignoredYellowBox = ignoreWarnings;

import React, { Component } from 'react';
import { Updates, SplashScreen, } from 'expo';
import * as Font from 'expo-font';
import { observer } from 'mobx-react';
import Moment from 'moment';
import styled from 'styled-components/native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import AppContainer from './src/component/screen/AppContainer';
import * as C from './src/lib/Const';
import Amplitude from './src/lib/Amplitude';
import Navigator from './src/lib/Navigator';

import ConfigStore from './src/store/ConfigStore';
import LobbyStore from './src/store/LobbyStore';
import UserStore from './src/store/UserStore';
import SkywayStore from './src/store/SkywayStore';
import PushStore from './src/store/PushStore';
import MatchingStore from './src/store/MatchingStore';


@observer
export default class App extends Component {

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
        if (ConfigStore.init['init']) return; // 二重実行対策
        ConfigStore.setInitLoad('font');
        ConfigStore.setInitLoadComplete('init');

        SplashScreen.preventAutoHide();
        
        ConfigStore.setInitLoad('skyway');
        ConfigStore.setInitLoad('user');
        ConfigStore.setInitLoad('lobby');
        ConfigStore.setInitLoad('push');
        ConfigStore.setInitLoad('matching');

        Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        }).then(() => {
            ConfigStore.setInitLoadComplete('font');
        });

        UserStore.anonymousLogin().then((user) => {
            if (!user || !user.user) {
                Amplitude.error('login', null);
                alert('ユーザー情報の取得に失敗しました。');
            }
            const userId = (user as FirebaseAuthTypes.UserCredential).user.uid;
            UserStore.init(userId);
            SkywayStore.connect(userId + Moment().unix().toString());
            LobbyStore.asyncInit(0);
            PushStore.asyncInit(userId);
            MatchingStore.init(userId);
        });

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
                <Root>
                    <Text>{ConfigStore.message}</Text>
                </Root>
            )
        }

        return (
            <AppContainer ref={(nav) => {
                Navigator.set(nav);
                const initailScreen = UserStore.isRegisted ? 'Lobby' : 'Register';
                Navigator.navigate(initailScreen, null);
            } } />
        );
    }
}

const {height, width} = Dimensions.get('window');
const Root = styled.View`
    height: ${height}px;
    flex: 1;
    justify-content: center;
`

const Text = styled.Text`
    align-self: center;
    font-size: 24px;
    font-weight: 400;
`

// import StorybookUI from './storybook';
// export default StorybookUI;
