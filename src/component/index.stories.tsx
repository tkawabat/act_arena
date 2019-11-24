import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View, Button } from 'native-base';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../lib/Const';
import * as StoryUtil from '../../storybook/StoryUtil';
import SkywayStoreAdmin from '../../storybook/admin/SkywayStoreAdmin';

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
    .add(Agreement.name, () => (
        StoryUtil.FullView(<Agreement />)
    ))
    .add(ArenaExplain.name, () => (
        StoryUtil.CenteredView(<ArenaExplain />)
    ))
    .add(ArenaFooter.name, () => (
        StoryUtil.CenteredView(<ArenaFooter />)
    ))
    .add(ArenaHeader.name, () => (
        StoryUtil.CenteredView(<ArenaHeader userNum={number('userNum', 1)} />)
    ))
    .add(Microphone.name, () => {
        return ([
            StoryUtil.CenteredView(<Microphone />),
            StoryUtil.CenteredView(<SkywayStoreAdmin />),
        ])
    })
    .add(Timer.name, () => (
        StoryUtil.CenteredView(<Timer />)
    ))
    .add(LobbyCard.name, () => (
        StoryUtil.CenteredView(<LobbyCard
            title={text('title', 'hoge')}
            explain={text('explain', 'fuga')}
            onPress={action('join')}
        />)
    ))
    .add(Scenario.name, () => (
        StoryUtil.FullView(<Scenario />)
        // <Scenario />
    ))
    ;