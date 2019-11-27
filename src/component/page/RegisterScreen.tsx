import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, Content, View, Button, Text, Item, Input, Picker, Icon, Header, Left, Right, Body, Title } from 'native-base';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';

import ScreenBase from './ScreenBase';

import * as C from '../../lib/Const';
import Navigator from '../../lib/Navigator';
import ConfigStore from '../../store/ConfigStore';
import UserStore from '../../store/UserStore';

import Intro from '../template/Intro';


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
        if (value.length >= C.UserNameMin) {
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
                <Header style={styles.header}>
                    <Left></Left>
                    <Body>
                        <Title>ユーザー登録</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.content}>
                    <View style={styles.inputView}>
                        <Item>
                            <Input
                                placeholder={'ハンドルネーム (~'+C.UserNameMax+'文字)'}
                                placeholderTextColor='#ccc'
                                onChangeText={this.onNameChange}
                                maxLength={20}
                            />
                        </Item>
                        <Item>
                            <Text>演じる役</Text>
                            <Picker
                                style={styles.gender}
                                mode='dropdown'
                                iosIcon={<Icon name='arrow-down' />}
                                selectedValue={this.state.gender}
                                onValueChange={(value: number) => { this.setState({ gender: value }); }}
                            >
                                <Picker.Item label="男役" value={C.Gender.Male} />
                                <Picker.Item label="女役" value={C.Gender.Female} />
                            </Picker>
                        </Item>
                    </View>

                    <View style={styles.terms}>
                    <Button warning style={styles.termsButton} onPress={this.readTerms}>
                        <Text style={styles.termsText}>利用規約</Text>
                    </Button>
                    <Button warning style={styles.termsButton} onPress={this.readPrivacy}>
                        <Text style={styles.termsText}>プライバシーポリシー</Text>
                    </Button>
                    </View>
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
    header: {
        paddingTop: 0,
        height: 50,
    },
    content: {
        //padding: 10,
    },
    inputView: {
        marginTop: 50,
        width: 250,
        alignSelf: 'center',
    },
    gender: {
        alignSelf: 'flex-end',
    },
    terms: {
        marginTop: 50,
        width: 300,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    termsButton: {
        width: 120,
        alignSelf: 'center',
        alignItems: 'center',
    },
    termsText: {
        textAlign: 'center',
    },
    termsCaution: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    registButton: {
        marginTop: 50,
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