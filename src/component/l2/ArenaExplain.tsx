import React, {Component} from 'react';
import { Text, View, Icon, } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


@observer
export default class ArenaExplain extends Component {

    render() {
        return (
            <Root>
                <ExplainTitle>アリーナの流れ</ExplainTitle>
                <SubTitle>1 {C.ArenaStateString[C.ArenaState.WAIT]}</SubTitle>
                <Explain>・画面の下の『エントリー』をぽちっ</Explain>
                <SubTitle>2 {C.ArenaStateString[C.ArenaState.READ]} ({C.ArenaStateTime[C.ArenaState.READ]}秒)</SubTitle>
                <Explain>・規約を読んで、『同意』をぽちっ</Explain>
                <Explain>　　　※演じる箇所までは自動でスクロール</Explain>
                <CenterText>〜〜通話開始〜〜</CenterText>
                <SubTitle>3 {C.ArenaStateString[C.ArenaState.CHECK]} ({C.ArenaStateTime[C.ArenaState.CHECK]}秒)</SubTitle>
                <Explain>・画面の下が<Microphone name='microphone' type='FontAwesome5'/>に変化</Explain>
                <Explain>・お互いの声が聞こえるか確認しよう</Explain>
                <SubTitle>4 {C.ArenaStateString[C.ArenaState.ACT]} ({C.ArenaStateTime[C.ArenaState.ACT]}秒)</SubTitle>
                <Explain>・思いっきり演じよう！</Explain>
            </Root>
        );
    }
}

const Root = styled(View)`
    flex: 1;
    padding: 15px;
`

const ExplainTitle = styled(Text)`
    font-size: 24px;
    font-weight: 400;
`

const SubTitle = styled(Text)`
    font-size: 20px;
    font-style: italic;
    margin-top: 20px;
`

const CenterText = styled(Text)`
    text-align: center;
    font-size: 20px;
    font-style: italic;
    margin-top: 20px;
`

const Explain = styled(Text)`
    font-size: 16px;
    margin-top: 5px;
    margin-left: 5px;
`

const Microphone = styled(Icon)`
    font-size: 12px;
`