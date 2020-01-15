import React from 'react';
import { Text, View, Button } from 'native-base';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../../lib/Const';
import * as StoryUtil from '../../../storybook/StoryUtil';
import ArenaScenarioStoreAdmin from '../../../storybook/admin/ArenaScenarioStoreAdmin';
import ArenaStoreAdmin from '../../../storybook/admin/ArenaStoreAdmin';

import ChatTab from './ChatTab';
import ScenarioTab from './ScenarioTab';



const components = storiesOf('L4', module);
components
    .addDecorator(withKnobs)
    .add(ChatTab.name, () => (
        StoryUtil.FullView(<ChatTab />)
    ))
    .add(ScenarioTab.name, () => (
        StoryUtil.FullView([
            <ScenarioTab />,
            <ArenaStoreAdmin />,
            <ArenaScenarioStoreAdmin />,
        ])
    ))
    ;