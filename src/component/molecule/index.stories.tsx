import React from 'react';
import { Text, View, Button } from 'native-base';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../../lib/Const';
import * as StoryUtil from '../../../storybook/StoryUtil';
import ArenaStoreAdmin from '../../../storybook/admin/ArenaStoreAdmin';

import ActInfo from './ActInfo';
import ArenaExplain from './ArenaExplain';

import LobbyCard from './LobbyCard';


const components = storiesOf('Molecule', module);
components
    .addDecorator(withKnobs)
    //     .add('ActInfo', () => (
    //       <CenteredView><ActInfo /></CenteredView>
    //     ))
    .add(ArenaExplain.name, () => (
        StoryUtil.CenteredView(<ArenaExplain />)
    ))
    .add(LobbyCard.name, () => (
        StoryUtil.CenteredView(<LobbyCard
            title={text('title', 'hoge')}
            explain={text('explain', 'fuga')}
            onPress={action('join')}
        />)
    ))
    ;