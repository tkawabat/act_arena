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
        ArenaScenarioStore.scenarioUrl = 'http://doodletxt.web.fc2.com/kiokudoro.htm';
        ArenaScenarioStore.agreementUrl = 'http://doodletxt.web.fc2.com/';
        ArenaScenarioStore.agreementScroll = 2500;
        ArenaScenarioStore.startText = '七原：……どうしたんですか？　海道さんらしくもない。';
        ArenaScenarioStore.endText = '七原：記憶泥棒は貴方なんですよ。海道さん。';
        ArenaScenarioStore.title = '記憶泥棒';

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
        ArenaScenarioStore.characters = [
            character1,
            character2,
        ];
    }

    render() {
        return (
            <Root>

            </Root>
        )
    }
}

const Root = styled.View`
    ${BasicStyle.screenWidth};
`