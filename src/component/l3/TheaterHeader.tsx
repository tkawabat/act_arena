import React, {Component} from 'react';
import { Alert } from 'react-native';
import { Button, Icon, } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import TheaterStore from '../../store/TheaterStore';
import TheaterUserStore from '../../store/TheaterUserStore';

import Timer from '../l1/Timer';
import TextBadge from '../l1/TextBadge';


interface props {
    userNum: number,
}

@observer
export default class TheaterHeader extends Component<props> {

    private leave = () => {
        Alert.alert('', '部屋から退出します。', [
            { text: 'OK', onPress: TheaterStore.leave}
            , { text: 'Cancel'}
        ]);
    }

    render() {
        
        return (
            <Root>
                <BasicStyle.Left>
                    <TheaterStateBadge
                        text={C.TheaterStateString[TheaterStore.theaterState]}
                        {...(badgeColor[TheaterStore.theaterState])}
                    />
                    <Timer />
                </BasicStyle.Left>
                <BasicStyle.Center>
                    <RoomIcon name='home' type='FontAwesome5' />
                    <RoomName>『{TheaterStore.time}』</RoomName>
                </BasicStyle.Center>
                <BasicStyle.Right>
                    <UesrIcon name='user' type='FontAwesome5' />
                    <UserNumText>{this.props.userNum}</UserNumText>
                    <Button transparent onPress={this.leave} disabled={!TheaterUserStore.canLeave}>
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

const TheaterStateBadge = styled(TextBadge)`
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
    [C.TheaterState.READ]: { warning: true },
    [C.TheaterState.CHECK]: { warning: true },
    [C.TheaterState.ACT]: { },
    [C.TheaterState.END]: { danger: true },
}