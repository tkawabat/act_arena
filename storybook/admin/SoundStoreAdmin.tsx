import React, { Component } from 'react';
import { View, Text, Item, Picker, Input } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { observer } from 'mobx-react';

import * as C from '../../src/lib/Const';
import * as BasicStyle from '../../src/lib/BasicStyle';

import RectangleTextButton from '../../src/component/l1/RectangleTextButton';

import SoundStore from '../../src/store/SoundStore';
import EnumSelector from '../component/EnumSelector';


interface props {
}


@observer
export default class SoundStoreAdmin extends Component<props> {

    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <Root>
                <RectangleTextButton text={'play'} onPress={() => SoundStore.playRondom(0.5, true)} />
                <RectangleTextButton text={'stop'} onPress={() => SoundStore.stop()} />
                <RectangleTextButton text={'fadein'} onPress={() => { SoundStore.playRondom(0, true); SoundStore.fadeIn(0.5) }} />
                <RectangleTextButton text={'fadeout'} onPress={() => SoundStore.fadeOut()} />
                <RectangleTextButton text={'se'} onPress={() => SoundStore.se(C.SeKey.MATCHING)} />
                <RectangleTextButton text={'loadMusic'} onPress={() => SoundStore.loadMusic()} />
                <RectangleTextButton text={'loadSe'} onPress={() => SoundStore.loadSe()} />
            </Root>
        )
    }
}

const Root = styled.View`
    ${BasicStyle.screenWidth};
`