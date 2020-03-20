import React, {Component} from 'react';
import { Icon, Card } from "native-base";
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import LobbyStore from '../../store/LobbyStore';

import LobbyCardBase from '../l1/LobbyCardBase';
import TextBadge from '../l1/TextBadge';


interface props {
    joinArena: (id:number) => void
}

@observer
export default class LobbyCardArena extends Component<props> {

    private onPress = () => {
        this.props.joinArena(0);
    }
    
    render() {
        return (
            <LobbyCardBase
                title={'オープン・アリーナ'}
                userNum={LobbyStore.userNum}
                onPress={this.onPress}
            >
                <Body>
                    <ExplainText>みんなでワイワイ！　3分で演じる名場面！</ExplainText>
                </Body>
                <Footer>
                    <EnterIcon name='sign-out-alt' type='FontAwesome5' />
                </Footer>                
            </LobbyCardBase>
        );
    }
}


const Body = styled.View`
    margin-top: 10px;
`;

const Footer = styled.View`
    align-self: flex-end;
`;

const ExplainText = styled.Text`
    margin-left: 15px;
    font-size: 16px;
`;

const EnterIcon = styled(Icon)`
    margin-top: 10px;
    font-size: 24px;
`