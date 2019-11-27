import React, { Component } from 'react';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import ConfigStore from '../../store/ConfigStore';
import ArenaStore from '../../store/ArenaStore';

import SquareTextIconButton from '../l1/SquareTextIconButton';
import ArenaAddTimeButton from '../l1/ArenaAddTimeButton';


@observer
export default class ScenarioTools extends Component {

    render() {
        const scenarioFlag = ArenaStore.arenaState !== C.ArenaState.WAIT && ArenaStore.isAgree;

        return (
            <Root>
                <Left><SquareTextIconButton icon={'info'} text={'劇情報'} onPress={() => ArenaStore.setModal(true)}/></Left>
                <Left><SquareTextIconButton icon={'home'} text={'規約'} onPress={() => ArenaStore.setAgreement(C.AgreementState.NONE)}/></Left>
                <Left><SquareTextIconButton icon={'arrow-up'} text={'トップ'} disabled={!scenarioFlag} onPress={() => ArenaStore.scroll2Top()}/></Left>
                <Left><SquareTextIconButton icon={'redo'} text={'開始位置'} disabled={!scenarioFlag} onPress={() => ArenaStore.scroll2Start()}/></Left>
                <Right><ArenaAddTimeButton /></Right>
            </Root>
        );

    }
}

const Root = styled.View`
    height: 50;
    margin-top: 5;
    ${BasicStyle.screenWidth};
    flex-direction: row;
    align-items: center;
    background-color: #000077;
`

const Left = styled.View`
    margin-left: 10px;
`
const Right = styled.View`
    justify-content: flex-end;
    margin-left: auto;
    margin-right: 10px;
`