import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View, Button } from 'native-base';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../lib/Const';

import ActInfo from './ActInfo';
import ArenaHeader from './ArenaHeader';
import ArenaFooter from './ArenaFooter';
import Microphone from './Microphone';
import Timer from './Timer';
import LobbyCard from './LobbyCard';

const CenteredView = (children) => <View style={styles.center}>{children}</View>;

const components = storiesOf('Components', module);
components
    .addDecorator(withKnobs)
    //     .add('ActInfo', () => (
    //       <CenteredView><ActInfo /></CenteredView>
    //     ))
    .add('ArenaHeader', () => (
        CenteredView(<ArenaHeader userNum={number('userNum', 1)} />)
    ))
    .add('ArenaFooter', () => (
        CenteredView(<ArenaFooter />)
    ))
    .add('Microphone', () => {
        const option = {
            DISABLED: C.SpeakState.DISABLED,
            MUTE: C.SpeakState.MUTE,
            SPEAK: C.SpeakState.SPEAK,
        }
        return (
            CenteredView(<Microphone speak={select('speak', option, C.SpeakState.DISABLED)}/>)
        )
    })
    .add('Timer', () => (
        CenteredView(<Timer />)
    ))
    .add('LobbyCard', () => (
        CenteredView(<LobbyCard
            title={text('title', 'hoge')}
            explain={text('explain', 'fuga')}
            onPress={action('join')}
        />)
    ))
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