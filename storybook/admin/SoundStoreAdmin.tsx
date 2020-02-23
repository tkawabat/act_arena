import React, { Component } from 'react';
import { View, Text, Item, Picker, Input } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { observer } from 'mobx-react';

import * as C from '../../src/lib/Const';
import * as BasicStyle from '../../src/lib/BasicStyle';

import SoundStore from '../../src/store/SoundStore';
import SkywayStore from '../../src/store/SkywayStore';

import EnumSelector from '../component/EnumSelector';

import RectangleTextButton from '../../src/component/l1/RectangleTextButton';


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
                <Section>
                    <RectangleTextButton text={'play'} onPress={() => SoundStore.playRondom(0.5, true)} />
                    <RectangleTextButton text={'stop'} onPress={() => SoundStore.stop()} />
                    <RectangleTextButton text={'fadein'} onPress={() => { SoundStore.playRondom(0, true); SoundStore.fadeIn(0.5) }} />
                    <RectangleTextButton text={'fadeout'} onPress={() => SoundStore.fadeOut()} />
                    <RectangleTextButton text={'se'} onPress={() => SoundStore.se(C.SeKey.MATCHING)} />
                    <RectangleTextButton text={'loadMusic'} onPress={() => SoundStore.loadMusic()} />
                    <RectangleTextButton text={'loadSe'} onPress={() => SoundStore.loadSe()} />
                </Section>
                <Section>
                    <RectangleTextButton text={'enable'} onPress={() => SkywayStore.setSpeakState(C.SpeakState.MUTE)} />
                    <RectangleTextButton text={'mic'} onPress={() => SkywayStore.toggleMicrophone()} />
                    <RectangleTextButton text={'join'} onPress={() => SkywayStore.join('test_skyway_store_admin')} />
                    <RectangleTextButton text={'leave'} onPress={() => SkywayStore.leave()} />
                    <EnumSelector
                    name={'SkywayState'}
                    myEnum={C.SkywayState}
                    onChange={(value: C.SkywayState) => { SkywayStore.state = value; }}
                        selectedValue={SkywayStore.state}
                    />
                    <EnumSelector
                        name={'SpeakState'}
                        myEnum={C.SpeakState}
                        onChange={(value: C.SpeakState) => { SkywayStore.speakState = value; }}
                        selectedValue={SkywayStore.speakState}
                    />
                </Section>
            </Root>
        )
    }
}

const Root = styled.View`
    ${BasicStyle.screenWidth};
    flex-direction: row;
`
const Section = styled.View`
    width: 200px;
`