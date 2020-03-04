import React, { Component } from 'react';
import { View, Text, Item, Picker, Input } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { observer } from 'mobx-react';

import * as C from '../../src/lib/Const';
import * as EnumUtil from '../../src/lib/EnumUtil';
import * as BasicStyle from '../../src/lib/BasicStyle';

import ArenaScenarioStore from '../../src/store/ArenaScenarioStore';

import IntSelector from '../component/IntSelector';
import EnumSelector from '../component/EnumSelector';


interface props {
}


@observer
export default class ArenaScenarioStoreAdmin extends Component<props> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root>
                <IntSelector
                    name={'agreementScroll'}
                    onChange={(value: string) => { ArenaScenarioStore.agreementScroll = parseInt(value); }}
                />
                <EnumSelector
                    name={'AgreementState'}
                    myEnum={C.AgreementState}
                    onChange={(value: C.AgreementState) => { ArenaScenarioStore.agreementState = value; }}
                    selectedValue={ArenaScenarioStore.agreementState}
                />
            </Root>
        )
    }
}

const Root = styled.View`
    ${BasicStyle.screenWidth};
    height: 200px;
`