import React, { Component } from 'react';
import { StyleSheet, YellowBox, AppState, Dimensions, Alert, View, Text } from 'react-native';
import { Sentry } from 'react-native-sentry';
import { Updates } from 'expo';
import * as Font from 'expo-font';
Sentry.config('https://8d1598d88afe47cb857fe4f49ff829f2@sentry.io/1500544').install();
import { observer } from 'mobx-react';
import Moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';

import AppContainer from './src/screen/AppContainer';
import Amplitude from './src/lib/Amplitude';
import Firebase from './src/lib/Firebase';
import Navigator from './src/lib/Navigator';
import ConfigStore from './src/store/ConfigStore';
import UserStore from './src/store/UserStore';
import SkywayStore from './src/store/SkywayStore';


@observer
export default class App extends Component {
    private _checking_update = false;
    private _updateSubscription;

    constructor(props) {
        super(props);

        const ignoreWarnings = ['Setting a timer for a long period of time,'];
        YellowBox.ignoreWarnings(ignoreWarnings);
        console.ignoredYellowBox = ignoreWarnings;

        Amplitude.info('init', null);
        
        ConfigStore.setInitLoad('font');
        ConfigStore.setInitLoad('skyway');
        ConfigStore.setInitLoad('user');
        ConfigStore.setInitLoad('arena');
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
        });
    }

    _checkUpdates = async () => {
        if (!this._checking_update) return;

        this._checking_update = true;

        const update = await Updates.checkForUpdateAsync()
            .catch(() => { })
            ;

        if (!update || !update.isAvailable) return;
        await Updates.fetchUpdateAsync();

        this._checking_update = false;
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            this._checkUpdates();
        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        this._updateSubscription = Updates.addListener(event => {
            if (event.type !== Updates.EventType.DOWNLOAD_FINISHED) return;
            
            Alert.alert(
                '', '新しいアプリがあります。アプリを再起動してください。',
                [
                    {
                        text: '再起動',
                        onPress: () => {
                            Updates.reloadFromCache();
                        }
                    },
                ], { cancelable: false }
            );
        });
        // fresh start check
        this._checkUpdates();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        this._updateSubscription && this._updateSubscription.remove();
    }

    render() {
        if (!ConfigStore.isInitLoaded) {
            return (
                <Spinner visible />
            )
        }

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