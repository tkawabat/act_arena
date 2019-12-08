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
import ChatTabHeader from './ChatTabHeader';
import LobbyCard from './LobbyCard';


const components = storiesOf('L2', module);
components
    .addDecorator(withKnobs)
    //     .add('ActInfo', () => (
    //       <CenteredView><ActInfo /></CenteredView>
    //     ))
    .add(ArenaExplain.name, () => (
        StoryUtil.CenteredView(<ArenaExplain />)
    ))
    .add(ChatTabHeader.name, () => (
        StoryUtil.CenteredView(<ChatTabHeader />)
    ))
    .add(LobbyCard.name, () => (
        StoryUtil.FullView([
            <LobbyCard
                title={text('title', 'アリーナ')}
                explain={text('explain', '3分で演じる名場面！')}
                userNumText={'5/10'}
                onPress={action('join')}
            />,
            <LobbyCard
                title={text('title2', 'プライベートアリーナ')}
                explain={text('explain2', '友達だけで気軽に遊べる部屋')}
                onPress={action('join2')}
            />,
        ])
    ))
    ;