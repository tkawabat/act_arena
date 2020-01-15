import React, {Component} from 'react';
import { TextInput, Alert } from 'react-native';
import { Icon, Card, Item, Input, Button, Label } from "native-base";
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import SquareTextButton from '../l1/SquareTextButton';


interface props {
    joinArena: (id:number) => void
}

@observer
export default class LobbyCardPrivateArena extends Component<props> {
    state = {
        value: -1
    }

    private createRandom = () => {
        const id = 100000 + Math.floor(Math.random() * 899999);
        this.setState({
            value: id
        });
    }

    private onPress = () => {
        if (this.state.value < 100000 || this.state.value >= 1000000) {
            Alert.alert('Room IDは6桁の数字にしてください。');
            return;
        }
        this.props.joinArena(this.state.value);
    }

    render() {
        return (
            <Touch onPress={this.onPress}>
                <Root>
                    <Main>
                        <CardTitle>
                            <TitleText>プライベート・アリーナ</TitleText>
                        </CardTitle>
                        <ExplainRoot>
                            <ExplainText>友達とIDを共有して気軽に遊ぼう！</ExplainText>
                        </ExplainRoot>
                        <InputRoot>
                            <Item>
                                <Label>Room ID:</Label>
                                <TextInput
                                    placeholder='Room ID'
                                    placeholderTextColor='#ccc'
                                    keyboardType='numeric'
                                    returnKeyType={'done'}
                                    maxLength={6}
                                    onChangeText={(value) => this.setState({ value })}
                                    value={this.state.value > 0 ? this.state.value.toString() : ''}
                                />
                            </Item>
                            <RandomButton onPress={this.createRandom}>
                                <RandomButtonText>ランダム生成</RandomButtonText>
                            </RandomButton>
                        </InputRoot>
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
    flex-direction: row;
    justify-content: space-between;
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
    font-size: 24;
    font-weight: 600;
    color: #000044;
`;

const ExplainRoot = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ExplainText = styled.Text`
    margin-top: 10px;
    margin-left: 15px;
    font-size: 16;
`;

const InputRoot = styled.View`
    flex-direction: row;
    margin-top: 10px;
`

const RandomButton = styled.TouchableOpacity`
    ${BasicStyle.center};
    border: 1px solid;
    box-shadow: 1px 1px 5px #c3e1ff;
    border-radius: 5;
    background-color: #fff;
    height: 25;
    padding: 3px;
    margin-left: 10px;
`;

const RandomButtonText = styled.Text`
    font-size: 12;
    font-weight: bold;
`

const EnterIcon = styled(Icon)`
    margin-top: 10px;
    font-size: 24;
`