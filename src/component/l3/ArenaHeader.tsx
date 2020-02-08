import React, {Component} from 'react';
import { Alert } from 'react-native';
import { Button, Icon, Badge } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaStore from '../../store/ArenaStore';
import ArenaUserStore from '../../store/ArenaUserStore';

import Timer from '../l1/Timer';


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
                <Left>
                    <ArenaStateBadge {...(C.ArenaStateStyle[ArenaStore.arenaState])}>
                        <BadgeText>{C.ArenaStateString[ArenaStore.arenaState]}</BadgeText>
                    </ArenaStateBadge>
                    <Timer />
                </Left>
                <Center>
                    <RoomIcon name='home' type='FontAwesome5' />
                    <RoomName>{roomName}</RoomName>
                </Center>
                <Right>
                    <UesrIcon name='user' type='FontAwesome5' />
                    <UserNumText>{this.props.userNum}</UserNumText>
                    <Button transparent onPress={this.leave} disabled={!ArenaUserStore.canLeave}>
                        <Icon name='sign-out-alt' type='FontAwesome5' />
                    </Button>
                </Right>
            </Root>
        )
    }
}


const Root = styled.View`
    ${BasicStyle.header};
`;

const Left = styled.View`
    flex: 1;
    justify-content: flex-start;
    padding-left: 10px;
`

const Center = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Right = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`

const ArenaStateBadge = styled(Badge)`
    height: 20px;
`

const BadgeText = styled.Text`
    color: #fff;
    font-size: 12px;
    font-weight: 500;
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