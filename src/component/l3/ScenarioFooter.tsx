import React, {Component} from 'react';
import { Badge } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaStore from '../../store/ArenaStore';
import ArenaUserStore from '../../store/ArenaUserStore';

import EntryButton from '../l1/EntryButton';
import Microphone from '../l1/Microphone';


@observer
export default class ScenarioFooter extends Component {

    render() {
        let entryButton;
        if (ArenaUserStore.userState !== C.ArenaUserState.ACTOR) {
            entryButton = (<EntryButton />);
        } else if (ArenaStore.arenaState !== C.ArenaState.READ) {
            entryButton = (<Microphone />)
        }

        return (
            <Root>
                <Left />
                <Center>
                    {entryButton}
                </Center>
                <Right>
                    <UserStaetBadge {...(C.ArenaUserStateStyle[ArenaUserStore.userState])}>
                        <BadgeText>{C.ArenaUserStateString[ArenaUserStore.userState]}</BadgeText>
                    </UserStaetBadge>
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

const UserStaetBadge = styled(Badge)`
    ${BasicStyle.center}
    margin: 10px;
`

const BadgeText = styled.Text`
    color: #fff;
    font-size: 12px;
    font-weight: 500;
`