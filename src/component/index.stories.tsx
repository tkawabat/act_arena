import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View, Button } from 'native-base';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../lib/Const';
import * as StoryUtil from '../lib/StoryUtil';

import ActInfo from './ActInfo';
import Agreement from './Agreement';
import ArenaExplain from './ArenaExplain';
import ArenaFooter from './ArenaFooter';
import ArenaHeader from './ArenaHeader';
import Microphone from './Microphone';
import Timer from './Timer';
import LobbyCard from './LobbyCard';
import Scenario from './Scenario';


const components = storiesOf('Component', module);
components
    .addDecorator(withKnobs)
    //     .add('ActInfo', () => (
    //       <CenteredView><ActInfo /></CenteredView>
    //     ))
    .add('Agreement', () => (
        StoryUtil.FullView(<Agreement />)
    ))
    .add('ArenaExplain', () => (
        StoryUtil.CenteredView(<ArenaExplain />)
    ))
    .add('ArenaFooter', () => (
        StoryUtil.CenteredView(<ArenaFooter />)
    ))
    .add('ArenaHeader', () => (
        StoryUtil.CenteredView(<ArenaHeader userNum={number('userNum', 1)} />)
    ))
    .add('Microphone', () => {
        const option = {
            DISABLED: C.SpeakState.DISABLED,
            MUTE: C.SpeakState.MUTE,
            SPEAK: C.SpeakState.SPEAK,
        }
        return (
            StoryUtil.CenteredView(<Microphone speak={select('speak', option, C.SpeakState.DISABLED)}/>)
        )
    })
    .add('Timer', () => (
        StoryUtil.CenteredView(<Timer />)
    ))
    .add('LobbyCard', () => (
        StoryUtil.CenteredView(<LobbyCard
            title={text('title', 'hoge')}
            explain={text('explain', 'fuga')}
            onPress={action('join')}
        />)
    ))
    .add('Senario', () => (
        // StoryUtil.FullView(<Scenario />)
        <Scenario />
    ))
    ;