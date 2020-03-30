import Moment from 'moment';
import React, {Component} from 'react';
import { Icon } from "native-base";
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import { Theater } from '../../model/TheaterModel';

import ConfigStore from '../../store/ConfigStore';
import TheaterStore from '../../store/TheaterStore';

import TextBadge from '../l1/TextBadge';
import LobbyCardBase from '../l1/LobbyCardBase';


interface props {
    theaterId: string
    theater: Theater
}

@observer
export default class LobbyCardTheater extends Component<props> {

    private joinTheater = () => {
        ConfigStore.load(true);
        TheaterStore.join(this.props.theaterId).then(() => {
            ConfigStore.load(false);
        });
    }
    
    render() {
        const title = '『'+this.props.theater.title+'』';
        const actors = this.props.theater.characters.map((v) => v.userName);
        const startTime = Moment.unix(this.props.theater.endAt[C.TheaterState.CHECK].seconds).format('MM/DD HH:mm');

        const endAt:Moment.Moment[] = [];
        endAt[C.TheaterState.READ] = Moment.unix(this.props.theater.endAt[C.TheaterState.READ].seconds);
        endAt[C.TheaterState.CHECK] = Moment.unix(this.props.theater.endAt[C.TheaterState.CHECK].seconds);
        endAt[C.TheaterState.ACT] = Moment.unix(this.props.theater.endAt[C.TheaterState.ACT].seconds);
        const [state,] = TheaterStore.calcState(endAt);

        return (
            <Root title={title} onPress={this.joinTheater} disabled={state===C.TheaterState.END}>
                <Left>
                    <ExplainText>{'演者: ' + actors.join(', ')}</ExplainText>
                    <ExplainText>{'開始予定: ' + startTime}</ExplainText>
                </Left>
                <Right>
                    <StateBadge text={C.TheaterStateString[state]} {...(badgeColor[state])}/>
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
    flex: 3;
    align-self: flex-start;
    justify-content: flex-end;
`;

const Right = styled.View`
    flex: 1;
`;

const ExplainText = styled.Text`
    margin-top: 10px;
    margin-left: 15px;
    color: #333;
`;

const StateBadge = styled(TextBadge)`
    margin-left: auto;
    width: 80px;
`

const EnterIcon = styled(Icon)`
    margin-top: 10px;
    margin-left: auto;
    font-size: 20px;
`

const badgeColor = {
    [C.TheaterState.READ]: { warning: true },
    [C.TheaterState.CHECK]: { warning: true },
    [C.TheaterState.ACT]: {  },
    [C.TheaterState.END]: { style: { opacity: 0.2} },
}