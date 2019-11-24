import React, { Component } from 'react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaStore from '../../store/ArenaStore';

import SquareTextButton from '../atom/SquareTextButton';
import SquareTextIconButton from '../atom/SquareTextIconButton';


export default class ScenarioTools extends Component {

    render() {
        return (
            <Root>
                <Left><SquareTextIconButton icon={'info'} text={'劇情報'} onPress={() => ArenaStore.setModal(true)}/></Left>
                <Left><SquareTextIconButton icon={'home'} text={'規約'} onPress={() => ArenaStore.setAgreement(C.AgreementState.NONE)}/></Left>
                <Left><SquareTextIconButton icon={'arrow-up'} text={'トップ'} onPress={() => ArenaStore.setAgreement(C.AgreementState.NONE)}/></Left>
                <Left><SquareTextIconButton icon={'redo'} text={'開始位置'} onPress={() => ArenaStore.setAgreement(C.AgreementState.NONE)}/></Left>
                <Right><SquareTextButton text={'+30秒'}/></Right>
            </Root>
        );

    }
}

const Root = styled.View`
    height: 60;
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