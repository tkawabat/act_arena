import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';

import * as C from '../../src/lib/Const';
import * as StoryUtil from '../../src/lib/StoryUtil';

import ArenaStoreAdmin from './ArenaStoreAdmin';

const components = storiesOf('Admin', module);
components
    .addDecorator(withKnobs)
    .add('ArenaStoreAdmin', () => {
        return (
            StoryUtil.CenteredView(<ArenaStoreAdmin />)
        )
    })
    ;