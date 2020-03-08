import React, {Component} from 'react';
import { TextInput, Alert } from 'react-native';
import { Icon, Card, Item, Label } from "native-base";
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    joinArena: (id:number) => void
}

@observer
export default class LobbyCardMatching extends Component<props> {
    private onPress = () => {
        this.props.joinArena(0);
    }
    
    render() {
        return (
            <Touch onPress={this.onPress}>
                <Root>
                    <Main>
                        <CardTitle>
                            <TitleText>サシ劇マッチング</TitleText>
                        </CardTitle>
                        <ExplainRoot>
                            <ExplainText>読み時間合わせて60分。サクッと１本劇しよう！</ExplainText>
                        </ExplainRoot>
                    </Main>
                    <Right>
                        <EnterIcon name='sign-out-alt' type='FontAwesome5' />
                    </Right>
                </Root>
            </Touch>
        );
    }
}


const Root = styled(Card)`
    margin: 10px;
    padding: 10px;
    color: #000;
`;

const Touch = styled.TouchableOpacity`
`;

const Main = styled.View`
`;

const Right = styled.View`
    align-self: flex-end;
`;

const CardTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const TitleText = styled.Text`
    font-size: 24px;
    font-weight: 600;
    color: #000044;
`;

const UserNumRoot = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    color: #333;
`;

const UserNumIcon = styled(Icon)`
    font-size: 16px;
`;

const UserNumText = styled.Text`
    font-size: 16px;
    margin-left: 2px;
`;

const ExplainRoot = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ExplainText = styled.Text`
    margin-top: 10px;
    margin-left: 15px;
    font-size: 16px;
`;

const EnterIcon = styled(Icon)`
    margin-top: 10px;
    font-size: 24px;
`