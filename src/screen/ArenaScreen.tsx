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
import ArenaStore from '../model/ArenaStore';


export default class Arena extends Component<ScreenProps> {

    componentDidMount() {
        ArenaStore.join();
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

    leave = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.leave()}>
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
                        <ActInfo />
                    </View>
                    <View style={styles.body}>
                        <Tabs scrollWithoutAnimation={false}>
                            <Tab heading='台本'>
                                <ScenarioMaster />
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