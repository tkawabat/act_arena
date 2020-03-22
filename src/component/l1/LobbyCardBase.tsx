import React, {Component} from 'react';
import { Card, Icon } from "native-base";
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    title: string
    userNum?: number
    disabled?: boolean
    onPress: () => void
}

@observer
export default class LobbyAdmin extends Component<props> {
    
    render() {
        let userNum = null;
        if (this.props.userNum != undefined) {
            userNum = (<UserNumRoot>
                <UserNumIcon name='user' type='FontAwesome5' />
                <UserNumText>{this.props.userNum + '/' + C.RoomUserLimit}</UserNumText>
            </UserNumRoot>);
        }

        return (
            <Touch onPress={this.props.onPress} disabled={this.props.disabled}>
                <Root disabled={this.props.disabled}>
                    <Header>
                        <TitleText>{this.props.title}</TitleText>
                        {userNum}
                    </Header>
                    <Main {...this.props}>
                        {this.props.children}
                    </Main>
                </Root>
            </Touch>
        );
    }
}


const Touch = styled.TouchableOpacity`
`;

const Root = styled(Card)`
    min-height: 100px;
    margin: 10px;
    padding: 10px;    
    color: #000;
    ${BasicStyle.disabled}
`;

const Header = styled.View`
    flex-direction: row
`;

const Main = styled.View`
    flex: 1;
    font-size: 12px;
`;

const TitleText = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: #000044;
`;

const UserNumRoot = styled.View`
    flex-direction: row;
    margin-left: auto;
    color: #333;
`;

const UserNumIcon = styled(Icon)`
    font-size: 16px;
`;

const UserNumText = styled.Text`
    font-size: 16px;
    margin-left: 2px;
`;