import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, Content, View, Button, H1, H2, Text, Item, Input, Picker, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { observer } from 'mobx-react';

import ScreenBase from './ScreenBase';

import * as C from '../lib/Const';
import ConfigStore from '../store/ConfigStore';
import UserStore from '../store/UserStore';

import Terms from '../component/Terms';


@observer
export default class RegisterScreen extends ScreenBase {
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
        ConfigStore.load(true);
        UserStore.set(this.state.name, this.state.gender).then(() => {
            ConfigStore.load(false);
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
        return (
            <Container　style={styles.container}>
                <Spinner visible={ConfigStore.isLoad} />
                <Content style={styles.content} scrollEnabled={false}>
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
                    </View>

                    <H2 style={styles.termsTitle}>利用規約</H2>
                    <Terms />
                    <Text style={styles.termsCaution}>
                        ※特に第3章の「台本の利用」については、{'\n'}
                        よく読み、ご確認してください。
                    </Text>

                    <View style={styles.buttonView}>
                        <Button style={styles.button} onPress={this.confirmRegist} disabled={this.state.disabled}>
                            <Text style={styles.buttonText}>規約に同意し、登録</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: width,
    },
    content: {
        padding: 10,
    },
    title: {
        marginTop: 40,
        marginLeft: 20,
    },
    view: {
        marginTop: 20,
        width: 250,
        alignSelf: 'center',
    },
    picker: {

    },
    termsTitle: {
        marginTop: 20,
        marginLeft: 20,
    },
    terms: {
        marginTop: 10,
    },
    termsCaution: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    buttonView: {
        padding: 10,
        marginTop: 20,
        justifyContent:'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 5,
        justifyContent:'center',
        textAlign: 'center',
    },
    buttonText: {
        
    },
});