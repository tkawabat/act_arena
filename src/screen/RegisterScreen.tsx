import React, { Component } from 'react';
import { Platform, StyleSheet, WebView, Dimensions } from 'react-native';
import { Container, View, Header, Content, Left, Body, Right, Button, Title, Text, Form, Item, Input, Picker, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { observer } from 'mobx-react';

import ScreenProps from './ScreenProps';

import * as C from '../lib/Const';
import LoadStore from '../store/LoadStore';
import UserStore from '../store/UserStore';

//import ArenaStore from '../store/ArenaStore';
//import LobbyCard from '../component/LobbyCard';

@observer
export default class RegisterScreen extends Component<ScreenProps> {
    state = {
        name: undefined
        , gender: C.Gender.Male
        , disabled: true
    }
    constructor(props) {
        super(props);
    }
    
    private regist = async () => {
        if (this.state.name.length < 3) {
            alert('ハンドルネームは3~20文字にしてください');
            return;
        }
        LoadStore.load(true);
        UserStore.set(this.state.name, this.state.gender).then(() => {
            LoadStore.load(false);
            const { navigation } = this.props;
            navigation.navigate('Lobby');
        });
    }

    private onNameChange = (value: string) => {
        let disabled = true;
        if (this.state.gender) {
            disabled = false;
        }
        this.setState({
            name: value
            , disabled: disabled
        });
    }

    private onGenderChange = (value: number) => {
        let disabled = true;
        if (this.state.name) {
            disabled = false;
        }
        this.setState({
            gender: value
            , disabled: disabled
        });
    }

    render() {
        if (UserStore.isRegisted) {
            const { navigation } = this.props;
            navigation.navigate('Lobby');
            return null;
        }
        return (
            <Container style={styles.container}>
                <Spinner visible={LoadStore.isLoad} />
                <Content>
                    <Form>
                        <Item>
                            <Input
                                placeholder='ハンドルネーム(3~20文字)'
                                placeholderTextColor='#ccc'
                                onChangeText={this.onNameChange}
                                maxLength={20}
                            />
                        </Item>
                        <Picker
                            mode='dropdown'
                            placeholder='性別'
                            iosIcon={<Icon name='arrow-down' />}
                            selectedValue={this.state.gender}
                            onValueChange={this.onGenderChange}
                        >
                            <Picker.Item label="男性" value={C.Gender.Male} />
                            <Picker.Item label="女性" value={C.Gender.Female} />
                        </Picker>
                    </Form>
                    <Button style={styles.button} onPress={this.regist} disabled={this.state.disabled}>
                        <Text>登録</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        top: 200
        , padding: 20
    }
    , picker: {
        marginLeft: 5
    }
    , button: {
        width: 100
        , marginTop: 10
        , justifyContent:'center'
    }
});