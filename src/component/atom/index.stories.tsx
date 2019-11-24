import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as C from '../../lib/Const';
import * as StoryUtil from '../../../storybook/StoryUtil';
import ArenaStoreAdmin from '../../../storybook/admin/ArenaStoreAdmin';
import SkywayStoreAdmin from '../../../storybook/admin/SkywayStoreAdmin';

import SquareTextButton from './SquareTextButton';
import SquareTextIconButton from './SquareTextIconButton';
import EntryButton from './EntryButton';
import Microphone from './Microphone';

const components = storiesOf('Atom', module);
components
    .addDecorator(withKnobs)
    .add(SquareTextButton.name, () => {
        return (
            StoryUtil.CenteredView(<SquareTextButton text={text('text', '+30秒')} />)
        )
    })
    .add(SquareTextIconButton.name, () => {
        return (
            StoryUtil.CenteredView(<SquareTextIconButton icon={text('icon', 'redo')} text={text('text', '規約')} />)
        )
    })
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
    ;