import React, { Component } from 'react';
import { View, Text, Item, Picker, Input, Button } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { observer } from 'mobx-react';

import * as C from '../../src/lib/Const';
import * as EnumUtil from '../../src/lib/EnumUtil';
import * as BasicStyle from '../../src/lib/BasicStyle';

import ArenaStore from '../../src/store/ArenaStore';
import ArenaUserStore from '../../src/store/ArenaUserStore';

import IntSelector from '../component/IntSelector';
import EnumSelector from '../component/EnumSelector';


interface props {
}


@observer
export default class ArenaStoreAdmin extends Component<props> {

    constructor(props) {
        super(props);
        // ArenaStore.arenaState = C.ArenaState.CHECK;
        ArenaStore.id = 555555;
        ArenaStore.time = 10;
    }

    render() {
        return (
            <Root>
                <IntSelector
                    name={'id'}
                    onChange={(value: string) => { ArenaStore.id = parseInt(value); }}
                />
                <EnumSelector
                    name={'ArenaState'}
                    myEnum={C.ArenaState}
                    onChange={(value: C.ArenaState) => { ArenaStore.arenaState = value; }}
                    selectedValue={ArenaStore.arenaState}
                />
                <EnumSelector
                    name={'ArenaUserState'}
                    myEnum={C.ArenaUserState}
                    onChange={(value: C.ArenaUserState) => { ArenaUserStore.userState = value; }}
                    selectedValue={ArenaUserStore.userState}
                />
                <IntSelector
                    name={'Timer'}
                    onChange={(value: string) => { ArenaStore.time = parseInt(value); }}
                />
                <IntSelector
                    name={'addTimeCount'}
                    onChange={(value: string) => { ArenaStore.addTimeCount = parseInt(value); }}
                />
                <Button onPress={() => { ArenaStore.setModal(true); }}>
                    <Text>modal</Text>
                </Button>
            </Root>
        )
    }
}

const Root = styled.View`
    ${BasicStyle.screenWidth};
`