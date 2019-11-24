import React, { Component } from 'react';
import { View, Text, Item, Picker, Input } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { observer } from 'mobx-react';

import * as C from '../../src/lib/Const';
import * as EnumUtil from '../../src/lib/EnumUtil';
import * as BasicStyle from '../../src/lib/BasicStyle';

import ArenaStore from '../../src/store/ArenaStore';

import EnumSelector from './EnumSelector';

interface props {
}


@observer
export default class ArenaStoreAdmin extends Component<props> {

    constructor(props) {
        super(props);
        // ArenaStore.arenaState = C.ArenaState.CHECK;
        ArenaStore.scenarioUrl = 'http://doodletxt.web.fc2.com/kiokudoro.htm';
        ArenaStore.agreementUrl = 'http://doodletxt.web.fc2.com/';
        ArenaStore.agreementScroll = 2500;
        ArenaStore.startText = '七原：……どうしたんですか？　海道さんらしくもない。';
        ArenaStore.endText = '七原：記憶泥棒は貴方なんですよ。海道さん。';
        ArenaStore.time = 10;
    }

    render() {
        return (
            <Root>
                <EnumSelector
                    name={'ArenaState'}
                    myEnum={C.ArenaState}
                    onValueChange={(value: C.ArenaState) => { ArenaStore.arenaState = value; }}
                    selectedValue={ArenaStore.arenaState}
                />
                <EnumSelector
                    name={'ArenaUserState'}
                    myEnum={C.ArenaUserState}
                    onValueChange={(value: C.ArenaUserState) => { ArenaStore.userState = value; }}
                    selectedValue={ArenaStore.userState}
                />
                <Item>
                    <Text>timer:</Text>
                    <Input
                        onChangeText={(value: string) => { ArenaStore.time = parseInt(value); }}
                    />
                </Item>
            </Root>
        )
    }
}

const Root = styled.View`
    ${BasicStyle.screenWidth};
`