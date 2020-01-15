import React from 'react';
import { Text, View, Button } from 'native-base';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../../lib/Const';
import * as StoryUtil from '../../../storybook/StoryUtil';
import ArenaStoreAdmin from '../../../storybook/admin/ArenaStoreAdmin';

import ArenaHeader from './ArenaHeader';
import ScenarioFooter from './ScenarioFooter';
import ScenarioTools from './ScenarioTools';



const components = storiesOf('L3', module);
components
    .addDecorator(withKnobs)
    .add(ArenaHeader.name, () => (
        StoryUtil.CenteredView([
            <ArenaHeader userNum={number('userNum', 1)} />,
            <ArenaStoreAdmin />
        ])
    ))
    .add(ScenarioFooter.name, () => ([
        StoryUtil.FullView(<ScenarioFooter />),
        StoryUtil.FullView(<ArenaStoreAdmin />),
    ]))
    .add(ScenarioTools.name, () => ([
        StoryUtil.FullView(<ScenarioTools />),
        StoryUtil.FullView(<ArenaStoreAdmin />),
    ]))
    ;