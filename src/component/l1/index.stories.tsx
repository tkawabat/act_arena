import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../../lib/Const';
import * as StoryUtil from '../../../storybook/StoryUtil';
import ArenaStoreAdmin from '../../../storybook/admin/ArenaStoreAdmin';
import ArenaScenarioStoreAdmin from '../../../storybook/admin/ArenaScenarioStoreAdmin';
import SkywayStoreAdmin from '../../../storybook/admin/SkywayStoreAdmin';

import Agreement from './Agreement';
import ArenaAddTimeButton from './ArenaAddTimeButton';
import EntryButton from './EntryButton';
import Microphone from './Microphone';
import Scenario from './Scenario';
import SquareIconButton from './SquareIconButton';
import SquareTextButton from './SquareTextButton';
import SquareTextIconButton from './SquareTextIconButton';
import Timer from './Timer';
import TestTellButton from './TestTellButton';


const components = storiesOf('L1', module);
components
    .addDecorator(withKnobs)
    .add(Agreement.name, () => (
        StoryUtil.FullView(<Agreement />)
    ))
    .add(ArenaAddTimeButton.name, () => ([
        StoryUtil.CenteredView(<ArenaAddTimeButton />),
        StoryUtil.CenteredView(<ArenaStoreAdmin />),
    ]))
    .add(EntryButton.name, () => ([
        StoryUtil.CenteredView(<EntryButton />),
        StoryUtil.CenteredView(<ArenaStoreAdmin />),
    ]))
    .add(Microphone.name, () => {
        return ([
            StoryUtil.CenteredView(<Microphone />),
            StoryUtil.CenteredView(<SkywayStoreAdmin />),
        ])
    })
    .add(Scenario.name, () => (
        StoryUtil.FullView([
            <Scenario />,
            <ArenaScenarioStoreAdmin />,
        ])
    ))
    .add(SquareIconButton.name, () => {
        return (
            StoryUtil.CenteredView(<SquareIconButton
                icon={text('icon', 'arrow-up')}
                disabled={boolean('disabled', false)}
                onPress={action('onPress')}
            />)
        )
    })
    .add(SquareTextButton.name, () => {
        return (
            StoryUtil.CenteredView(<SquareTextButton
                text={text('text', '+30秒')}
                disabled={boolean('disabled', false)}
                onPress={action('onPress')}
            />)
        )
    })
    .add(SquareTextIconButton.name, () => {
        return (
            StoryUtil.CenteredView(<SquareTextIconButton
                icon={text('icon', 'redo')}
                text={text('text', '規約')}
                disabled={boolean('disabled', false)}
                onPress={action('onPress')}
            />)
        )
    })
    .add(Timer.name, () => (
        StoryUtil.CenteredView([
            <Timer />,
            <ArenaStoreAdmin />,
        ])
    ))
    .add(TestTellButton.name, () => (
        StoryUtil.CenteredView([
            <TestTellButton />,
        ])
    ))
    ;