import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Platform, StyleSheet, Text, View, WebView } from 'react-native';

import ScreenProps from './ScreenProps';

import * as C from '../lib/Const';

import SkywayStore from '../model/SkywayStore';

import ScenarioMaster from '../component/ScenarioMaster';
import Timer from '../component/Timer';
import ActInfo from '../component/ActInfo';
import Microphone from '../component/Microphone';


interface Props extends ScreenProps {
    agreement: string;
    url: string;
    start: string;
    end: string;
}

export default class Arena extends Component<Props> {
    componentDidMount() {
        SkywayStore.join('aaa');
        console.log('ArenaScreen componentDidMount');
    }

    componentDidUpdate() {
        console.log('ArenaScreen componentDidUpdate');
    }

    componentWillUnmount() {
        SkywayStore.leave();
        console.log('ArenaScreen componentWillUnmount');
    }

    onPress = (text) => {
        console.log(text);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            
                            this.props.navigation.goBack();
                        }}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>アリーナ</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <Timer />
                    <ActInfo />
                    {/*
                    <ScenarioMaster
                        agreement={'http://uriuriko.web.fc2.com/about.html'}
                        url={'http://uriuriko.web.fc2.com/kizuato12.htm'}
                        start={'レイス「あは…はははっ！」'}
                        end={'レイス「剣の脆弱（ぜいじゃく）さ、思い知らせてあげるよ。」'}
                    />
                    */}
                    <ScenarioMaster
                        agreement='http://doodletxt.web.fc2.com/'
                        url='http://doodletxt.web.fc2.com/paranormansboogie3.html'
                        start='宝屋敷：ちょっとぉ、ボケるには早いんじゃないのぉ？'
                        end='セオドア：観光と、仕事と、半分半分かな。'
                    />
                    {/*
                    <ScenarioMaster
                        agreement='http://doodletxt.web.fc2.com/' 
                        url='http://doodletxt.web.fc2.com/paranormansboogie3.html'
                        start='宝屋敷：ちょっとぉ、ボケるには早いんじゃないのぉ？'
                        end='セオドア：観光と、仕事と、半分半分かな。'
                    />
                    */}
                    <Microphone />
                    <Text style={styles.instructions}>
                        エントリーボタン他
                    </Text>
                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#333',
    }
    , instructions: {
        textAlign: 'center',
        color: '#FFF',
        marginBottom: 5,
        height: 100,
        backgroundColor: 'blue',
    }
    , webview: {
    }
});
