import React, {Component} from 'react';
import { TextInput, Alert } from 'react-native';
import { Icon, Card, Item, Label } from "native-base";
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import LobbyCardBase from '../l1/LobbyCardBase';


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
            <LobbyCardBase
                title={'プライベート・アリーナ'}
                onPress={this.onPress}
            >
                <Body>
                    <ExplainText>友達とIDを共有して気軽に遊ぼう！</ExplainText>
                </Body>
                <Footer>
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
    flex-direction: row;
`;

const ExplainText = styled.Text`
    margin-left: 15px;
    font-size: 16px;
`;

const InputRoot = styled.View`
    flex-direction: row;
    margin-top: 10px;
`

const RandomButton = styled.TouchableOpacity`
    ${BasicStyle.center};
    border: 1px solid;
    box-shadow: 1px 1px 5px #c3e1ff;
    border-radius: 5px;
    background-color: #fff;
    height: 25px;
    padding: 3px;
    margin-left: 10px;
`;

const RandomButtonText = styled.Text`
    font-size: 12px;
    font-weight: bold;
`

const EnterIcon = styled(Icon)`
    margin-top: 10px;
    margin-left: auto;
    font-size: 24px;
`