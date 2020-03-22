import React, {Component} from 'react';
import { Alert } from 'react-native';
import { Button, Icon, } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaStore from '../../store/ArenaStore';
import ArenaUserStore from '../../store/ArenaUserStore';

import Timer from '../l1/Timer';
import TextBadge from '../l1/TextBadge';


interface props {
    userNum: number,
}

@observer
export default class ArenaHeader extends Component<props> {

    private leave = () => {
        Alert.alert('', 'アリーナから退出します。', [
            { text: 'OK', onPress: ArenaStore.leave}
            , { text: 'Cancel'}
        ]);
    }

    render() {
        const roomName = ArenaStore.id === 0 ? 'アリーナ' : ArenaStore.id;
        
        return (
            <Root>
                <BasicStyle.Left>
                    <ArenaStateBadge
                        text={C.ArenaStateString[ArenaStore.arenaState]}
                        {...(badgeColor[ArenaStore.arenaState])}
                    />
                    <Timer time={ArenaStore.time} />
                </BasicStyle.Left>
                <BasicStyle.Center>
                    <RoomIcon name='home' type='FontAwesome5' />
                    <RoomName>{roomName}</RoomName>
                </BasicStyle.Center>
                <BasicStyle.Right>
                    <UesrIcon name='user' type='FontAwesome5' />
                    <UserNumText>{this.props.userNum}</UserNumText>
                    <Button transparent onPress={this.leave} disabled={!ArenaUserStore.canLeave}>
                        <Icon name='sign-out-alt' type='FontAwesome5' />
                    </Button>
                </BasicStyle.Right>
            </Root>
        )
    }
}


const Root = styled.View`
    ${BasicStyle.header};
`;

const ArenaStateBadge = styled(TextBadge)`
    height: 20px;
`

const RoomIcon = styled(Icon)`
    font-size: 16px;
`

const RoomName = styled.Text`
    color: #333;
    margin-left: 3px;
    font-size: 18px;
    font-weight: 600;
`

const UesrIcon = styled(Icon)`
    font-size: 16px;
`

const UserNumText = styled.Text`
    font-size: 16px;
    margin-left: 2px;
    margin-right: 2px;
`

const badgeColor = {
    [C.ArenaState.WAIT]: { 'success': true },
    [C.ArenaState.READ]: { 'warning': true },
    [C.ArenaState.CHECK]: { 'warning': true },
    [C.ArenaState.ACT]: { 'danger': true },
}