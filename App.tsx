import React, { Component } from 'react';
import { Sentry } from 'react-native-sentry';
Sentry.config('https://8d1598d88afe47cb857fe4f49ff829f2@sentry.io/1500544').install();
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';

import Navigator from './src/index';
import LoadStore from './src/store/LoadStore';


@observer
export default class App extends Component {
    constructor(props) {
        super(props);        
        Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        }).then(() => {
            LoadStore.font = true;
        });
    }

    render() {
        if (!LoadStore.isLoaded) {
            return (
                <Spinner
                    visible
                    textContent={'読み込み中'}
                    textStyle={{ color: 'white' }}
                />
            )
        }

        return (
            <Navigator />
        );
    }
}