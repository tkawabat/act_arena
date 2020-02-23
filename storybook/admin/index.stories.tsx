import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';

import * as C from '../../src/lib/Const';
import * as StoryUtil from '../StoryUtil';

import ArenaStoreAdmin from './ArenaStoreAdmin';
import ArenaScenarioStoreAdmin from './ArenaScenarioStoreAdmin';
import SoundStoreAdmin from './SoundStoreAdmin';
import SkywayStoreAdmin from './SkywayStoreAdmin';

const components = storiesOf('Admin', module);
components
    .addDecorator(withKnobs)
    .add(ArenaStoreAdmin.name, () => {
        return (
            StoryUtil.CenteredView(<ArenaStoreAdmin />)
        )
    })
    .add(ArenaScenarioStoreAdmin.name, () => {
        return (
            StoryUtil.CenteredView(<ArenaScenarioStoreAdmin />)
        )
    })
    .add(SoundStoreAdmin.name, () => {
        return (
            StoryUtil.CenteredView(<SoundStoreAdmin />)
        )
    })
    .add(SkywayStoreAdmin.name, () => {
        return (
            StoryUtil.CenteredView(<SkywayStoreAdmin />)
        )
    })
    ;