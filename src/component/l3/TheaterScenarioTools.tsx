import React, { Component } from 'react';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';
import { Left, Right } from '../../lib/BasicModule';

import TheaterStore from '../../store/TheaterStore';
import TheaterUserStore from '../../store/TheaterUserStore';
import SkywayStore from '../../store/SkywayStore';
import UserStore from '../../store/UserStore';

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
                <Left>
                    <TextIconButton icon={'info'} text={'劇情報'} onPress={TheaterStore.setModal.bind(this, true)}/>
                    <TextIconButton icon={'home'} text={'規約'} onPress={TheaterStore.reloadAgreement}/>
                </Left>

                <Right>
                    <TextIconButton icon={'redo'} text={'再接続'} onPress={SkywayStore.reconnect.bind(this, UserStore.id)}/>
                    <TextButton text={text} onPress={TheaterStore.asyncSetNext} disabled={disabled} />
                </Right>
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

const TextButton = styled(SquareTextButton)`
    margin-left: 2.5px;
    margin-right: 2.5px;
`

const TextIconButton = styled(SquareTextIconButton)`
    margin-left: 2.5px;
    margin-right: 2.5px;
`