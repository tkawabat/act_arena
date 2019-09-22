import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { View, Text } from 'native-base';
import { Sentry } from 'react-native-sentry';
Sentry.config('https://8d1598d88afe47cb857fe4f49ff829f2@sentry.io/1500544').install();
import { observer } from 'mobx-react';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';

import AppContainer from './src/screen/AppContainer';
import Navigator from './src/lib/Navigator';
import ConfigStore from './src/store/ConfigStore';
import UserStore from './src/store/UserStore';
import SkywayStore from './src/store/SkywayStore';


@observer
export default class App extends Component {
    constructor(props) {
        super(props);

        YellowBox.ignoreWarnings(['Setting a timer']);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        
        ConfigStore.setInitLoad('font');
        ConfigStore.setInitLoad('skyway');
        ConfigStore.setInitLoad('user');
        ConfigStore.setInitLoadComplete('init');

        Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        }).then(() => {
            ConfigStore.setInitLoadComplete('font');
        });
        
        UserStore.anonymousLogin().then((user) => {
            if (!user) {
                alert('ユーザー情報の取得に失敗しました。');
            }
            //SkywayStore.connect((user as Firebase.auth.UserCredential).user.uid);
            SkywayStore.connect(moment().unix().toString());
        });
    }

    render() {
        if (!ConfigStore.isInitLoaded) {
            return (
                <Spinner visible />
            )
        }

        return (
            <AppContainer ref={(nav) => {
                Navigator.setNavigator(nav);
                let initailScreen = UserStore.isRegisted ? 'Lobby' : 'Register';
                Navigator.navigate(initailScreen, null);
            } } />
        );
    }
}