import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView, Dimensions } from 'react-native';
import { Container, Header, Body, Content, Left, Right, Button, Icon, Title, Tabs, Tab } from 'native-base';

import ScreenProps from './ScreenProps';

import * as C from '../lib/Const';

import SkywayStore from '../model/SkywayStore';

import ScenarioMaster from '../component/ScenarioMaster';
import Chat from '../component/Chat';
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
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>アリーナ</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.content}>
                    <View style={styles.info}>
                        <Timer />
                        <ActInfo style={styles.actInfo} />
                    </View>
                    <View style={styles.body}>
                        <Tabs scrollWithoutAnimation={false}>
                            <Tab heading='台本'>
                                <ScenarioMaster
                                    agreement='http://doodletxt.web.fc2.com/'
                                    url='http://doodletxt.web.fc2.com/paranormansboogie3.html'
                                    start='宝屋敷：ちょっとぉ、ボケるには早いんじゃないのぉ？'
                                    end='セオドア：観光と、仕事と、半分半分かな。'
                                />
                                {/*
                    <ScenarioMaster
                        agreement={'http://uriuriko.web.fc2.com/about.html'}
                        url={'http://uriuriko.web.fc2.com/kizuato12.htm'}
                        start={'レイス「あは…はははっ！」'}
                        end={'レイス「剣の脆弱（ぜいじゃく）さ、思い知らせてあげるよ。」'}
                    />
                    */}

                                {/*
                    <ScenarioMaster
                        agreement='http://doodletxt.web.fc2.com/' 
                        url='http://doodletxt.web.fc2.com/paranormansboogie3.html'
                        start='宝屋敷：ちょっとぉ、ボケるには早いんじゃないのぉ？'
                        end='セオドア：観光と、仕事と、半分半分かな。'
                    />
                    */}
                            </Tab>
                            <Tab heading='チャット'>
                                <Chat />
                            </Tab>
                        </Tabs>
                    </View>
                    <View style={styles.action}>
                        <Microphone />
                        <Text>
                            エントリーボタン他
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
    , header: {
        height: 50
    }
    , content: {
        padding: 5
    }
    , info: {
        flexDirection: 'row'
        , height: 50
    }
    , actInfo: {
    }
    , body: {
        height: height - 50 - 50 - 70 - 5 - 5 - 5
        , justifyContent: 'center'
        , backgroundColor: '#333'
    }
    , instructions: {
        textAlign: 'center',
        color: '#FFF',
        marginBottom: 5,
        height: 100,
        backgroundColor: 'blue',
    }
    , action: {
        height: 70
    }
});