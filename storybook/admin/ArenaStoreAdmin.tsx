import React, { Component } from 'react';
import { View, Text, Item, Picker, Input } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { observer } from 'mobx-react';

import * as C from '../../src/lib/Const';
import * as BasicStyle from '../../src/lib/BasicStyle';

import ArenaStore from '../../src/store/ArenaStore';


interface props {
}


@observer
export default class TextButton extends Component<props> {

    constructor(props) {
        super(props);
        ArenaStore.arenaState = C.ArenaState.CHECK;
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
                <Item>
                    <Text>ArenaState:</Text>
                    <Picker
                        mode='dropdown'
                        onValueChange={(value: C.ArenaState) => { ArenaStore.arenaState = value; }}
                        selectedValue={ArenaStore.arenaState}
                    >
                        <Picker.Item label="WAIT" value={C.ArenaState.WAIT} />
                        <Picker.Item label="CHECK" value={C.ArenaState.CHECK} />
                        <Picker.Item label="CONFIRM" value={C.ArenaState.CONFIRM} />
                        <Picker.Item label="ACT" value={C.ArenaState.ACT} />
                    </Picker>
                </Item>
                <Item>
                    <Text>ArenaUserState:</Text>
                    <Picker
                        mode='dropdown'
                        onValueChange={(value: C.ArenaUserState) => { ArenaStore.userState = value; }}
                        selectedValue={ArenaStore.userState}
                    >
                        <Picker.Item label="LISTNER" value={C.ArenaUserState.LISTNER} />
                        <Picker.Item label="ENTRY" value={C.ArenaUserState.ENTRY} />
                        <Picker.Item label="ACTOR" value={C.ArenaUserState.ACTOR} />
                    </Picker>
                </Item>
                <Item>
                    <Text>timer:</Text>
                    <Input
                        onChangeText={(value: string) => { ArenaStore.time = parseInt(value); }}
                        maxLength={20}
                    />
                </Item>
            </Root>
        )
    }
}

const Root = styled.View`
    ${BasicStyle.screenWidth};
`