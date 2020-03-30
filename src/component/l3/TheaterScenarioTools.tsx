import React, { Component } from 'react';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import TheaterStore from '../../store/TheaterStore';
import TheaterUserStore from '../../store/TheaterUserStore';

import SquareTextIconButton from '../l1/SquareTextIconButton';
import SquareTextButton from '../l1/SquareTextButton';


@observer
export default class TheaterScenarioTools extends Component {

    render() {

        const text = C.TheaterNextString[TheaterStore.theaterState];
        const disabled = TheaterStore.userState === C.TheaterUserState.LISTNER
            || TheaterUserStore.next === TheaterStore.theaterState    
            || TheaterStore.theaterState === C.TheaterState.END
            ;

        return (
            <Root>
                <Left><SquareTextIconButton icon={'info'} text={'劇情報'} onPress={TheaterStore.setModal.bind(this, true)}/></Left>
                <Left><SquareTextIconButton icon={'home'} text={'規約'} onPress={TheaterStore.reloadAgreement}/></Left>
                <Right><SquareTextButton text={text} onPress={TheaterStore.asyncSetNext} disabled={disabled} /></Right>
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
    background-color: ${BasicStyle.colorMiddle};
`

const Left = styled.View`
    margin-left: 10px;
`
const Right = styled.View`
    justify-content: flex-end;
    margin-left: auto;
    margin-right: 10px;
`