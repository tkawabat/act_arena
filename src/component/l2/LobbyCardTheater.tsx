import Moment from 'moment';
import React, {Component} from 'react';
import { Card, Icon, Badge } from "native-base";
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import { Theater } from '../../model/TheaterModel';

import TextBadge from '../l1/TextBadge';
import LobbyCardBase from '../l1/LobbyCardBase';

interface props {
    theater: Theater
}

@observer
export default class LobbyCardTheater extends Component<props> {
    private onPress = () => {
        //MatchingStore.toggle();
    }
    
    render() {
        const title = '『'+this.props.theater.title+'』';
        const actors = this.props.theater.characters.map((v) => v.userName);
        const start = Moment.unix(this.props.theater.createdAt.seconds).format('HH:mm');
        const end = Moment.unix(this.props.theater.endAt[C.TheaterState.ACT].seconds).format('HH:mm');

        return (
            <Root title={title} onPress={this.onPress}>
                <Left>
                    <ExplainText>{'演者: ' + actors.join(', ')}</ExplainText>
                    <ExplainText>{start + '~' + end}</ExplainText>
                </Left>
                <Right>
                    <StateBadge text={'上演中'} />
                    <EnterIcon name='sign-out-alt' type='FontAwesome5' />
                </Right>
            </Root>
        );
    }
}


const Root = styled(LobbyCardBase)`
    flex-direction: row;
`

const Left = styled.View`
    flex: 4;
    align-self: flex-start;
    justify-content: flex-end;
`;

const Right = styled.View`
    flex: 1;
`;

const ExplainText = styled.Text`
    margin-top: 10px;
    margin-left: 15px;
    font-size: 16px;
    color: #333;
`;

const StateBadge = styled(TextBadge)`
    margin-left: auto;
`

const EnterIcon = styled(Icon)`
    margin-top: 10px;
    margin-left: auto;
    font-size: 24px;
`