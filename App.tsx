import React, { Component } from 'react';
import Navigator from './src/index';

export default class App extends Component {
    state = { fontLoaded: false };

    async componentWillMount() {
        await Expo.Font.loadAsync({
                'Roboto': require('native-base/Fonts/Roboto.ttf'),
                'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
                });

        this.setState({fontLoaded: true});
    }

  render() {
      if (!this.state.fontLoaded) return null;

    return (
      <Navigator />
    );
  }
}
