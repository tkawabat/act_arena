import React, { Component } from 'react';
import { View, Text, Item, Picker, Input } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { observer } from 'mobx-react';

import * as C from '../../src/lib/Const';
import * as BasicStyle from '../../src/lib/BasicStyle';

import RectangleTextButton from '../../src/component/l1/RectangleTextButton';

import SkywayStore from '../../src/store/SkywayStore';
import EnumSelector from '../component/EnumSelector';


interface props {
}


@observer
export default class SkywayStoreAdmin extends Component<props> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root>
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
            </Root>
        )
    }
}

const Root = styled.View`
    ${BasicStyle.screenWidth};
`