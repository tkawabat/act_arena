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

        // ArenaScenarioStore.scenarioUrl = 'http://doodletxt.web.fc2.com/para6v3.html';
        // ArenaScenarioStore.agreementUrl = 'http://doodletxt.web.fc2.com/';
        // ArenaScenarioStore.agreementScroll = 2500;
        // ArenaScenarioStore.startText = '田中：……雨が止んだら。';
        // ArenaScenarioStore.endText = 'Ｎ：男は漆黒に染まった瞳で少女を捉えながら、ゆっくりと歩みを進める。';
        // ArenaScenarioStore.title = 'パラノーマンズ・ブギー⑥『大馬鹿者　前編』';
        // const character1 = {
        //     name: '妖紅',
        //     gender: C.Gender.Female,
        //     user: '1',
        //     userName: 'はなこ'
        // };
        // const character2 = {
        //     name: '田中＆N',
        //     gender: C.Gender.Male,
        //     user: '2',
        //     userName: 'たろう'
        // };

        ArenaScenarioStore.scenarioUrl = 'http://doodletxt.web.fc2.com/hgw.html';
        ArenaScenarioStore.agreementUrl = 'http://doodletxt.web.fc2.com/';
        ArenaScenarioStore.agreementScroll = 2500;
        ArenaScenarioStore.startText = '堂島：親臣、お前さ。';
        ArenaScenarioStore.endText = '　　　今は、いつだ？';
        ArenaScenarioStore.title = 'ハローグッドワールド';
        const character1 = {
            name: '蝶野',
            gender: C.Gender.Male,
            user: '1',
            userName: 'aaaa'
        };
        const character2 = {
            name: '堂島',
            gender: C.Gender.Male,
            user: '2',
            userName: 'たろう'
        };


        ArenaScenarioStore.characters = [
            character1,
            character2,
        ];
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