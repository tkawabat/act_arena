import React, { Component } from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, Content, View, Button, H1, Text, Form, Item, Input, Picker, Icon } from 'native-base';
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

    private confirmRegist = () => {
        Alert.alert('', '一度決定すると変更できません。\nデータを保存してよろしいでしょうか？', [
            { text: 'OK', onPress: this.regist}
            , { text: 'Cancel'}
        ]);
    }
    
    private regist = async () => {
        LoadStore.load(true);
        UserStore.set(this.state.name, this.state.gender).then(() => {
            LoadStore.load(false);
        });
    }

    private onNameChange = (value: string) => {
        let disabled = true;
        if (this.state.gender && value.length >= 3) {
            disabled = false;
        }

        this.setState({
            name: value
            , disabled: disabled
        });
    }

    private onGenderChange = (value: number) => {
        let disabled = true;
        if (this.state.name && this.state.name.length >= 3) {
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
            <Container>
                <Spinner visible={LoadStore.isLoad} />
                <Content style={styles.content}>
                    <H1 style={styles.title}>ユーザー登録</H1>
                    <View style={styles.view}>
                        <Item>
                            <Input
                                placeholder='ハンドルネーム (3~20文字)'
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
                            style={styles.picker}
                        >
                            <Picker.Item label="男性" value={C.Gender.Male} />
                            <Picker.Item label="女性" value={C.Gender.Female} />
                        </Picker>
                        <View style={styles.buttonView}>
                            <Button style={styles.button} onPress={this.confirmRegist} disabled={this.state.disabled}>
                                <Text style={styles.buttonText}>登録</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    content: {
        width: width
        , height: height
        , padding: 30
    }
    , title: {
        marginTop: 50
    }
    , view: {
        padding: 10
        , marginTop: 20
    }
    , picker: {
        
    }
    , buttonView: {
        padding: 10
        , marginTop: 20
        , justifyContent:'center'
        , alignItems: 'center'
    }
    , button: {
        width: 100
        , marginTop: 5  
        , justifyContent:'center'
        , textAlign: 'center'      
    }
    , buttonText: {
        
    }
});