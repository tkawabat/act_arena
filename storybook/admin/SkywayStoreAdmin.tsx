import React, { Component } from 'react';
import { View, Text, Item, Picker, Input } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { observer } from 'mobx-react';

import * as C from '../../src/lib/Const';
import * as BasicStyle from '../../src/lib/BasicStyle';

import SkywayStore from '../../src/store/SkywayStore';
import EnumSelector from './EnumSelector';


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
                <EnumSelector
                    name={'SkywayState'}
                    myEnum={C.SkywayState}
                    onValueChange={(value: C.SkywayState) => { SkywayStore.state = value; }}
                    selectedValue={SkywayStore.state}
                />
                <EnumSelector
                    name={'SpeakState'}
                    myEnum={C.SpeakState}
                    onValueChange={(value: C.SpeakState) => { SkywayStore.speakState = value; }}
                    selectedValue={SkywayStore.speakState}
                />
            </Root>
        )
    }
}

const Root = styled.View`
    ${BasicStyle.screenWidth};
`