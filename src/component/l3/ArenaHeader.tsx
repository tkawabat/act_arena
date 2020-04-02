import React, {Component} from 'react';
import { Alert } from 'react-native';
import { Button, Icon, } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';
import { Header, HeaderTitle, Left, Center, Right } from '../../lib/BasicModule';

import ArenaStore from '../../store/ArenaStore';
import ArenaUserStore from '../../store/ArenaUserStore';

import Timer from '../l1/Timer';
import TextBadge from '../l1/TextBadge';
import IconButton from '../l1/IconButton';


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
            <Header>
                <Left>
                    <ArenaStateBadge
                        text={C.ArenaStateString[ArenaStore.arenaState]}
                        {...(badgeColor[ArenaStore.arenaState])}
                    />
                    <Timer time={ArenaStore.time} />
                </Left>
                <Center>
                    <RoomIcon name='home' type='FontAwesome5' />
                    <HeaderTitle>{roomName}</HeaderTitle>
                </Center>
                <Right>
                    <UesrIcon name='user' type='FontAwesome5' />
                    <UserNumText>{this.props.userNum}</UserNumText>
                    <IconButton icon={'sign-out-alt'} onPress={this.leave} disabled={!ArenaUserStore.canLeave} />
                </Right>
            </Header>
        )
    }
}


const ArenaStateBadge = styled(TextBadge)`
    height: 20px;
`

const RoomIcon = styled(Icon)`
    font-size: 16px;
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