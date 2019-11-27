import React, { Component } from 'react';
import { View, Text, Item, Picker, Input } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { observer } from 'mobx-react';

import * as C from '../../src/lib/Const';
import * as EnumUtil from '../../src/lib/EnumUtil';
import * as BasicStyle from '../../src/lib/BasicStyle';

import ArenaStore from '../../src/store/ArenaStore';

import IntSelector from '../component/IntSelector';
import EnumSelector from '../component/EnumSelector';


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
        ArenaStore.title = '記憶泥棒';

        const character1 = {
            name: 'chara1',
            gender: C.Gender.Male,
            user: '1',
            userName: 'hoge'
        };
        const character2 = {
            name: 'chara2',
            gender: C.Gender.Female,
            user: '2',
            userName: 'fuga'
        };
        ArenaStore.characters = [
            character1,
            character2,
        ];
    }

    render() {
        return (
            <Root>
                <EnumSelector
                    name={'ArenaState'}
                    myEnum={C.ArenaState}
                    onChange={(value: C.ArenaState) => { ArenaStore.arenaState = value; }}
                    selectedValue={ArenaStore.arenaState}
                />
                <EnumSelector
                    name={'ArenaUserState'}
                    myEnum={C.ArenaUserState}
                    onChange={(value: C.ArenaUserState) => { ArenaStore.userState = value; }}
                    selectedValue={ArenaStore.userState}
                />
                <IntSelector
                    name={'Timer'}
                    onChange={(value: string) => { ArenaStore.time = parseInt(value); }}
                />
                <IntSelector
                    name={'addTimeCount'}
                    onChange={(value: string) => { ArenaStore.addTimeCount = parseInt(value); }}
                />
            </Root>
        )
    }
}

const Root = styled.View`
    ${BasicStyle.screenWidth};
`