import React, {Component} from 'react';
import { Text, View, Icon, } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { css } from 'styled-components';

import * as C from '../lib/Const';


@observer
export default class ArenaExplain extends Component {

    render() {
        return (
            <Root>
                <ExplainTitle>アリーナの流れ</ExplainTitle>
                <SubTitle>1 {C.ArenaStateString[C.ArenaState.WAIT]}</SubTitle>
                <Explain>・画面の下の『エントリー』をぽちっ</Explain>
                <SubTitle>2 {C.ArenaStateString[C.ArenaState.CONFIRM]} ({C.ArenaStateTime[C.ArenaState.CONFIRM]}秒)</SubTitle>
                <Explain>・画面の下が<Microphone name='microphone' type='FontAwesome5'/>に変化</Explain>
                <Explain>・ミュートを解除、お互いの声が聞こえるか確認しよう</Explain>
                <SubTitle>3 {C.ArenaStateString[C.ArenaState.CHECK]} ({C.ArenaStateTime[C.ArenaState.CHECK]}秒)</SubTitle>
                <Explain>・規約をしっかり読んで、『同意』をぽちっ</Explain>
                <Explain>　※演じる箇所までは自動でスクロール</Explain>
                <Explain>・ストーリー、キャラ、セリフをチェック</Explain>
                <SubTitle>4 {C.ArenaStateString[C.ArenaState.ACT]} ({C.ArenaStateTime[C.ArenaState.ACT]}秒)</SubTitle>
                <Explain>・劇を開始！　思いっきり演じよう</Explain>
            </Root>
        );
    }
}

const Root = styled(View)`
    flex: 1;
    padding: 20px;
`

const ExplainTitle = styled(Text)`
    font-size: 24;
    font-weight: 400;
`

const SubTitle = styled(Text)`
    font-size: 20;
    font-style: italic;
    margin-top: 20;
`

const Explain = styled(Text)`
    font-size: 16;
    margin-top: 5;
    margin-left: 5;
`

const Microphone = styled(Icon)`
    font-size: 12
`