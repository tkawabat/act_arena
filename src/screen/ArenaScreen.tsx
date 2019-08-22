import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, Body, Left, Right, Text, View, Button, Icon, Title, Tabs, Tab } from 'native-base';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { observer } from 'mobx-react';

import ScreenProps from './ScreenProps';

import * as C from '../lib/Const';

import ArenaStore from '../store/ArenaStore';
import UserStore from '../store/UserStore';

import ScenarioMaster from '../component/ScenarioMaster';
import Timer from '../component/Timer';
import ActInfo from '../component/ActInfo';
import Microphone from '../component/Microphone';


@observer
export default class Arena extends Component<ScreenProps> {

    componentDidMount() {  
        console.log('ArenaScreen componentDidMount');
    }

    componentDidUpdate() {
        console.log('ArenaScreen componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('ArenaScreen componentWillUnmount');
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => ArenaStore.leave()}>
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
                                <View style={styles.action}>
                                    <Microphone />
                                    <Text>
                                        エントリーボタン他
                                    </Text>
                                </View>
                            </Tab>
                            <Tab heading='チャット'>
                                <GiftedChat
                                    messages={ArenaStore.messages}
                                    onSend={ArenaStore.addChat}
                                    dateFormat={'MM/DD'}
                                    timeFormat={"HH:MM"}
                                    user={{
                                        _id: UserStore.id,
                                        name: UserStore.name
                                    }}
                                />
                            </Tab>
                        </Tabs>
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
        height: height - 50 - 50 - 5 - 5 - 5
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