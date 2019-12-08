import React, {Component} from 'react';
import { Icon, Card } from "native-base";
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    title: string,
    explain: string,
    userNumText?: string,
    onPress: () => void
}

@observer
export default class LobbyCard extends Component<props> {
    render() {
        const userNum = !this.props.userNumText ? null : (
            <UserNumRoot>
                <UserNumIcon name='user' type='FontAwesome5' />
                <UserNumText>{this.props.userNumText}</UserNumText>
            </UserNumRoot>
        );

        return (
            <Root>
                <Touch onPress={this.props.onPress}>
                    <CardTitle>
                        <TitleText>{this.props.title}</TitleText>
                        {userNum}
                    </CardTitle>
                    <ExplainRoot>
                        <ExplainText>{this.props.explain}</ExplainText>
                        <EnterIcon name='sign-out-alt' type='FontAwesome5' />
                    </ExplainRoot>
                </Touch>
            </Root>
        );
    }
}


const Root = styled(Card)`
    height: 90;
    margin: 15px;
    padding: 15px;
    color: #000;
`;

const Touch = styled.TouchableOpacity`
`;

const CardTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const TitleText = styled.Text`
    font-size: 24;
    font-weight: 600;
    color: #000044;
`;

const UserNumRoot = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    color: #333;
`;

const UserNumIcon = styled(Icon)`
    font-size: 16;
`;

const UserNumText = styled.Text`
    font-size: 16;
    margin-left: 2px;
`;

const ExplainRoot = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ExplainText = styled.Text`
    margin-top: 15px;
    margin-left: 15px;
    font-size: 16;
`;

const EnterIcon = styled(Icon)`
    margin-top: 10px;
    font-size: 24;
`