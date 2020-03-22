import React, {Component} from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import TheaterStore from '../../store/TheaterStore';

import Microphone from '../l1/Microphone';
import TextBadge from '../l1/TextBadge';


@observer
export default class TheaterScenarioFooter extends Component {

    render() {
        let button = null;
        if (TheaterStore.theaterState !== C.TheaterState.READ) {
            button = (<Microphone />)
        }

        return (
            <Root>
                <Left />
                <Center>
                    {button}
                </Center>
                <Right>
                    <UserStaetBadge
                        text={C.TheaterUserStateString[TheaterStore.userState]}
                        {...(badgeColor[TheaterStore.userState])}
                    />
                </Right>
            </Root>
        )
    }
}

const Root = styled.View`
    height: 50px;
    ${BasicStyle.screenWidth};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #000044;
`

const Left = styled.View`
    flex: 1;
`
const Center = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const Right = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`

const UserStaetBadge = styled(TextBadge)`
    margin: 10px;
`

const badgeColor = {
    [C.TheaterUserState.LISTNER]: {'warning':true},
    [C.TheaterUserState.ACTOR]: {'danger':true},
}