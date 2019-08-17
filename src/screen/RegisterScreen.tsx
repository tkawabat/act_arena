import React, { Component } from 'react';
import { Container, View, Header, Content, Left, Body, Right, Button, Title, Text, Form, Item, Input, Picker, Icon } from 'native-base';
import { observer } from 'mobx-react';

import ScreenProps from './ScreenProps';

import * as C from '../lib/Const';

//import ArenaStore from '../store/ArenaStore';
//import LobbyCard from '../component/LobbyCard';

@observer
export default class RegisterScreen extends Component<ScreenProps> {
    state = {
        name: undefined
        , gender: undefined
    }
    constructor(props) {
        super(props);
    }
    
    private regist = () :void => {
        console.log(this.state)
        const { navigation } = this.props;
        navigation.navigate('Lobby');
    }

    private onNameChange = (value: string) => {
        this.setState({
            name: value
        });
    }

    private onGenderChange = (value: number) => {
        this.setState({
            gender: value
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>初回登録</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input
                                placeholder="Username"
                                onChangeText={this.onNameChange}
                            />
                        </Item>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            //style={{ width: undefined }}
                            selectedValue={this.state.gender}
                            onValueChange={this.onGenderChange}
                        >
                            <Picker.Item label="男性" value={C.Gender.Male} />
                            <Picker.Item label="女性" value={C.Gender.Female} />
                        </Picker>
                    </Form>
                    <Button onPress={this.regist}>
                        <Text>登録</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
