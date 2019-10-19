import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, Content, View, Button, H1, H2, Text, Item, Input, Picker, Icon } from 'native-base';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';

import ScreenBase from './ScreenBase';

import * as C from '../lib/Const';
import Navigator from '../lib/Navigator';
import ConfigStore from '../store/ConfigStore';
import UserStore from '../store/UserStore';

import Intro from '../component/Intro';


@observer
export default class RegisterScreen extends ScreenBase {
    
    state = {
        intro: true,
        name: undefined,
        gender: C.Gender.Male,
        validName: false,
        terms: false,
    }

    constructor(props) {
        super(props);
    }

    get disabled() {
        return !this.state.validName || !this.state.terms;
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
        let validName = false;
        if (value.length >= 3) {
            validName = true;
        }

        this.setState({
            name: value,
            validName: validName,
        });
    }

    private readTerms = () => {
        Navigator.navigate('Terms', null);
        this.setState({terms:true});
    }

    private readPrivacy = () => {
        Navigator.navigate('Privacy', null);
    }

    get registCaution() {
        const ret = [];
        
        if (!this.state.validName) {
            ret.push(
                <Text style={styles.registCaution}>
                    ※ハンドルネームを入力してください。
                </Text>
                );
        }
        if (!this.state.terms) {
            ret.push(
                <Text style={styles.registCaution}>
                    ※利用規約を読んでください。
                </Text>
                );
        }

        return ret;
    }

    render() {
        if (this.state.intro) {
            return (<Intro done={() => this.setState({intro:false})} />);
        }
        
        return (
            <Container　style={styles.container}>
                <Spinner visible={ConfigStore.isLoad} />
                <Content style={styles.content} scrollEnabled={false}>
                    <H1 style={styles.title}>ユーザー登録</H1>
                    <View style={styles.inputView}>
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
                            placeholder='演じる役'
                            iosIcon={<Icon name='arrow-down' />}
                            selectedValue={this.state.gender}
                            onValueChange={(value:number) => {this.setState({gender: value});}}
                        >
                            <Picker.Item label="男役" value={C.Gender.Male} />
                            <Picker.Item label="女役" value={C.Gender.Female} />
                        </Picker>
                    </View>

                    <H2 style={styles.title}>規約</H2>
                    <Button warning style={styles.termsButton} onPress={this.readTerms}>
                        <Text style={styles.termsText}>利用規約を確認</Text>
                    </Button>
                    <Button warning style={styles.termsButton} onPress={this.readPrivacy}>
                        <Text style={styles.termsText}>プライバシーポリシーを確認</Text>
                    </Button>
                    <Text style={styles.termsCaution}>
                        ※特に第3章の「台本の利用」については、{'\n'}
                        よく読み、ご確認してください。
                    </Text>
                    
                    <Button
                        info
                        style={styles.registButton}
                        onPress={this.confirmRegist}
                        disabled={this.disabled}
                    >
                        <Text style={styles.registText}>規約に同意し、登録</Text>
                    </Button>

                    {this.registCaution}
                    
                </Content>
            </Container>
        );
    }
}

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        marginTop: getStatusBarHeight(),
        marginBottom: getBottomSpace(),
    },
    content: {
        padding: 10,
    },
    title: {
        marginTop: 40,
        marginLeft: 20,
    },
    inputView: {
        marginTop: 20,
        width: 250,
        alignSelf: 'center',
    },
    termsButton: {
        marginTop: 20,
        alignSelf: 'center',
        alignItems: 'center',
    },
    termsText: {
        
    },
    termsCaution: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    registButton: {
        marginTop: 70,
        alignSelf: 'center',
        alignItems: 'center',
    },
    registText: {
        
    },
    registCaution: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        color: 'gray'
    },
});