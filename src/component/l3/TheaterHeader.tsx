import React, {Component} from 'react';
import { Alert } from 'react-native';
import { Icon, } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';
import { Header, HeaderTitle, ColumnLeft, Center, Right } from '../../lib/BasicModule';

import TheaterStore from '../../store/TheaterStore';

import Timer from '../l1/Timer';
import TextBadge from '../l1/TextBadge';
import IconButton from '../l1/IconButton';


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
            <Header>
                <ColumnLeft>
                    <TheaterStateBadge
                        text={C.TheaterStateString[TheaterStore.theaterState]}
                        {...(badgeColor[TheaterStore.theaterState])}
                    />
                    <Timer time={TheaterStore.time} />
                </ColumnLeft>
                <Center>
                    <HeaderTitle>『{TheaterStore.title}』</HeaderTitle>
                </Center>
                <Right>
                    <UesrIcon name='user' type='FontAwesome5' />
                    <UserNumText>{this.props.userNum}</UserNumText>
                    {/* <IconButton icon={'sign-out-alt'} onPress={this.leave} disabled={!TheaterStore.canLeave} /> */}
                    <IconButton icon={'sign-out-alt'} onPress={this.leave} />
                </Right>
            </Header>
        )
    }
}


const TheaterStateBadge = styled(TextBadge)`
    height: 20px;
`

const UesrIcon = styled(Icon)`
    font-size: 16px;
`

const UserNumText = styled.Text`
    font-size: 16px;
    margin-left: 2px;
`

const badgeColor = {
    [C.TheaterState.READ]: { warning: true },
    [C.TheaterState.CHECK]: { warning: true },
    [C.TheaterState.ACT]: { },
    [C.TheaterState.END]: { danger: true },
}