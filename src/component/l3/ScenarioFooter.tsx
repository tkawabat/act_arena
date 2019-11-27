import React, {Component} from 'react';
import { Badge } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaStore from '../../store/ArenaStore';

import EntryButton from '../l1/EntryButton';
import Microphone from '../l1/Microphone';


@observer
export default class ScenarioFooter extends Component {

    render() {
        const entryButton = ArenaStore.userState == C.ArenaUserState.ACTOR ?
            (<Microphone />) : (<EntryButton />)
            ;

        return (
            <Root>
                <Left />
                <Center>
                    {entryButton}
                </Center>
                <Right>
                    <UserStaetBadge {...(C.ArenaUserStateStyle[ArenaStore.userState])}>
                        <BadgeText>{C.ArenaUserStateString[ArenaStore.userState]}</BadgeText>
                    </UserStaetBadge>
                </Right>
            </Root>
        )
    }
}

const Root = styled.View`
    height: 50;
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

const UserStaetBadge = styled(Badge)`
    margin: 10px;
`

const BadgeText = styled.Text`
    color: #fff;
    font-size: 12;
    font-weight: 500;
`