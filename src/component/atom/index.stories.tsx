import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../../lib/Const';
import * as StoryUtil from '../../../storybook/StoryUtil';

import TextButton from './TextButton';
import TextIconButton from './TextIconButton';

const components = storiesOf('Atom', module);
components
    .addDecorator(withKnobs)
    .add('TextButton', () => {
        return (
            StoryUtil.CenteredView(<TextButton text={text('text', '+30秒')} />)
        )
    })
    .add('TextIconButton', () => {
        return (
            StoryUtil.CenteredView(<TextIconButton icon={text('icon', 'redo')} text={text('text', '規約')} />)
        )
    })
    ;