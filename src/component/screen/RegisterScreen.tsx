import React from 'react';
import { Alert } from 'react-native';
import { Container, Content, Button, Text, Item, Input, Picker, Icon, Header, Left, Right, Body, Title } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import Spinner from 'react-native-loading-spinner-overlay';

import ScreenBase from './ScreenBase';

import * as C from '../../lib/Const';
import Navigator from '../../lib/Navigator';
import * as BasicStyle from '../../lib/BasicStyle';

import ConfigStore from '../../store/ConfigStore';
import UserStore from '../../store/UserStore';

import Intro from '../l4/Intro';


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
                <RegistCaution key={0}>
                    ※ハンドルネームを入力してください。
                </RegistCaution>
                );
        }
        if (!this.state.terms) {
            ret.push(
                <RegistCaution key={1}>
                    ※利用規約を読んでください。
                </RegistCaution>
                );
        }

        return ret;
    }

    render() {
        if (this.state.intro) {
            return (<Intro done={() => this.setState({intro:false})} />);
        }
        
        return (
            <Root>
                <Spinner visible={ConfigStore.isLoad} />
                <Header_>
                    <Left></Left>
                    <Body>
                        <Title>ユーザー登録</Title>
                    </Body>
                    <Right />
                </Header_>
                <Content>
                    <InputView>
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
                            <Gender
                                mode='dropdown'
                                iosIcon={<Icon name='arrow-down' />}
                                selectedValue={this.state.gender}
                                onValueChange={(value: number) => { this.setState({ gender: value }); }}
                            >
                                <Picker.Item label="男役" value={C.Gender.Male} />
                                <Picker.Item label="女役" value={C.Gender.Female} />
                            </Gender>
                        </Item>
                    </InputView>

                    <Terms>
                        <TermsButton warning onPress={this.readTerms}>
                            <TermsText>利用規約</TermsText>
                        </TermsButton>
                        <TermsButton warning onPress={this.readPrivacy}>
                        <TermsText>{"プライバシー\nポリシー"}</TermsText>
                        </TermsButton>
                    </Terms>
                    <TermsCaution>
                        ※特に第3章の「台本の利用」については、{'\n'}
                        よく読み、ご確認してください。
                    </TermsCaution>
                    
                    <RegistButton info onPress={this.confirmRegist} disabled={this.disabled}>
                        <RegistText>規約に同意して登録</RegistText>
                    </RegistButton>

                    {this.registCaution}
                    
                </Content>
            </Root>
        );
    }
}

const Root = styled(Container)`
    ${BasicStyle.screenRoot};
    ${BasicStyle.screenWidth};
`

const Header_ = styled(Header)`
    ${BasicStyle.header};
`

const InputView = styled.View`
    margin-top: 50px;
    width: 250px;
    align-self: center;
`

const Gender = styled(Picker)`
    align-self: flex-end;
`

const Terms = styled.View`
    margin-top: 50px;
    width: 300px;
    flex-direction: row;
    align-self: center;
    justify-content: space-between;
`

const TermsButton = styled(Button)`
    width: 120px;
    ${BasicStyle.center};
`

const TermsText = styled.Text`
    text-align: center;
    font-weight: 500;
    color: white;
`

const TermsCaution = styled.Text`
    margin-top: 10px;
    text-align: center;
    font-size: 16px;
    text-decoration-line: underline;
`

const RegistButton = styled(Button)`
    margin-top: 50px;
    width: 150px;
    align-self: center;
    ${BasicStyle.center};
`

const RegistText = styled.Text`
    font-weight: 500;
    color: white;
`

const RegistCaution = styled.Text`
    margin-top: 10px;
    text-align: center;
    font-size: 16px;
    color: gray;
`