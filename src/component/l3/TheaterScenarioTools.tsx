import React, { Component } from 'react';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import TheaterStore from '../../store/TheaterStore';

import SquareTextIconButton from '../l1/SquareTextIconButton';
import ArenaAddTimeButton from '../l1/ArenaAddTimeButton';


@observer
export default class TheaterScenarioTools extends Component {

    render() {

        return (
            <Root>
                <Left><SquareTextIconButton icon={'info'} text={'劇情報'} onPress={TheaterStore.setModal.bind(this, true)}/></Left>
                <Left><SquareTextIconButton icon={'home'} text={'規約'} onPress={TheaterStore.reloadAgreement}/></Left>
                {/* <Right><ArenaAddTimeButton /></Right> */}
            </Root>
        );

    }
}

const Root = styled.View`
    height: 50px;
    margin-top: 5px;
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