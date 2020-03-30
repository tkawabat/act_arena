import React, {Component} from 'react';
import { Alert } from 'react-native';
import { Button, Icon, } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';
import { Header, HeaderTitle, Left, Center, Right } from '../../lib/BasicModule';
import Navigator from '../../lib/Navigator';

import PushStore from '../../store/PushStore';

import Bell from '../l1/Bell';


interface props {
}

@observer
export default class LobbyHeader extends Component<props> {

    render() {
        return (
            <Header>
                <Left>
                    <Bell onPress={PushStore.viewSettingModal} />
                </Left>
                <Center>
                    <HeaderTitle>ロビー</HeaderTitle>
                </Center>
                <Right>
                    <Button transparent onPress={Navigator.navigate.bind(this, 'Setting', null)} >
                        <ConfigIcon name='cog' type='FontAwesome5' />
                    </Button>
                </Right>
            </Header>
        )
    }
}


const ConfigIcon = styled(Icon)`
    font-size: 24px;
    color: gray;
    margin-right: 5px;
`