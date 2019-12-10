import React from 'react';
import { Text, View, Button } from 'native-base';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../../lib/Const';
import * as StoryUtil from '../../../storybook/StoryUtil';
import ArenaStoreAdmin from '../../../storybook/admin/ArenaStoreAdmin';
import ArenaScenarioStoreAdmin from '../../../storybook/admin/ArenaScenarioStoreAdmin';

import ActInfoModal from './ActInfoModal';
import ArenaExplain from './ArenaExplain';
import ChatTabHeader from './ChatTabHeader';
import LobbyCard from './LobbyCardArena';
import LobbyCardPrivateArena from './LobbyCardPrivateArena';

const components = storiesOf('L2', module);
components
    .addDecorator(withKnobs)
    .add(ActInfoModal.name, () => (
        StoryUtil.CenteredView([
            <ActInfoModal />,
            <ArenaScenarioStoreAdmin />,
            <ArenaStoreAdmin />,
        ])
    ))
    .add(ArenaExplain.name, () => (
        StoryUtil.CenteredView(<ArenaExplain />)
    ))
    .add(ChatTabHeader.name, () => (
        StoryUtil.CenteredView(<ChatTabHeader />)
    ))
    .add(LobbyCard.name, () => (
        StoryUtil.FullView([
            <LobbyCard
                joinArena={action('join')}
            />,
            <LobbyCardPrivateArena
                joinArena={action('join2')}
            />,
        ])
    ))
    ;