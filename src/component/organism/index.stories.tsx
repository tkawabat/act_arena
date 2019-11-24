import React from 'react';
import { Text, View, Button } from 'native-base';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../../lib/Const';
import * as StoryUtil from '../../../storybook/StoryUtil';

import ScenarioSideTools from './ScenarioSideTools';


const components = storiesOf('Organism', module);
components
    .addDecorator(withKnobs)
    .add(ScenarioSideTools.name, () => (
        StoryUtil.FullView(<ScenarioSideTools />)
    ))
    ;