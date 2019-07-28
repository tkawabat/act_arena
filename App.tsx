import React, { Component } from 'react';
import Navigator from './src/index';
import Skyway from './src/lib/Skyway';

export default class App extends Component {
    state = { fontLoaded: false };
    constructor(props) {
        super(props);
        const skyway = new Skyway();
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
