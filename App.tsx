import React, { Component } from 'react';
import Navigator from './src/index';
import { Sentry } from 'react-native-sentry';
Sentry.config('https://8d1598d88afe47cb857fe4f49ff829f2@sentry.io/1500544').install();
import Skyway from './src/lib/Skyway';


export default class App extends Component {
    state = { fontLoaded: false };
    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        if (!this.state.fontLoaded) return null;

        return (
            <Navigator />
        );
    }
}