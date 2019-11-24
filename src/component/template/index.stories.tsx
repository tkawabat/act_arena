import React from 'react';
import { Text, View, Button } from 'native-base';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../../lib/Const';
import * as StoryUtil from '../../../storybook/StoryUtil';

import ScenarioTab from './ScenarioTab';


const components = storiesOf('Template', module);
components
    .addDecorator(withKnobs)
    .add('SenarioTab', () => (
        StoryUtil.FullView(<ScenarioTab />)
    ))
    ;