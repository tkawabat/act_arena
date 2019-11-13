import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View, Button } from 'native-base';

import { storiesOf } from '@storybook/react-native';
//import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
//import { action } from '@storybook/addon-ondevice-actions';

import ActInfo from './ActInfo';
import ArenaHeader from './ArenaHeader';
import ArenaFooter from './ArenaFooter';
import Microphone from './Microphone';
import Timer from './Timer';
import LobbyCard from './LobbyCard';

const CenteredView = ({ children }) => <View style={styles.center}>{children}</View>;

const components = storiesOf('Components', module);
components
    .addDecorator(withKnobs)
//     .add('ActInfo', () => (
//       <CenteredView><ActInfo /></CenteredView>
//     ))
    .add('ArenaHeader', () => (
        <CenteredView><ArenaHeader /></CenteredView>
    ))
    .add('ArenaFooter', () => (
        <CenteredView><ArenaFooter /></CenteredView>
    ))
    .add('Microphone', () => (
      <CenteredView><Microphone /></CenteredView>
    ))
    .add('Timer', () => (
      <CenteredView><Timer /></CenteredView>
    ))
    .add('LobbyCard', () => {
        return (            
            <CenteredView><LobbyCard title={text('title', 'hoge')} explain={text('explain', 'fuga')} onPress={() => { }} /></CenteredView>
        )
    })
    ;

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  center: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});