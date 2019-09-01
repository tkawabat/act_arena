import React, { Component } from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, Header, Content, Body, Left, Right, Text, View, Button, Icon, Title, Tabs, Tab } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';


import ScreenProps from './ScreenProps';

import * as C from '../lib/Const';

import LoadStore from '../store/LoadStore';
import ArenaStore from '../store/ArenaStore';
import UserStore from '../store/UserStore';

import ScenarioMaster from '../component/ScenarioMaster';
import Timer from '../component/Timer';
import ActInfo from '../component/ActInfo';
import ArenaActionMaster from '../component/ArenaActionMaster';
import OverlayMessage from '../component/OverlayMessage';


@observer
export default class Arena extends Component<ScreenProps> {
    private leave = () => {
        Alert.alert('', 'アリーナから退出します。', [
            { text: 'OK', onPress: ArenaStore.leave}
            , { text: 'Cancel'}
        ]);
    }

    render() { 
        return (
            <Container style={styles.container}>
                <Spinner visible={LoadStore.isLoad} />
                <Header style={styles.header}>
                    <Left>
                        <Timer />
                    </Left>
                    <Body>
                        <Title>{C.ArenaStateString[ArenaStore.arenaState]}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.leave} disabled={!ArenaStore.canLeave}>
                            <Icon name='sign-out-alt' type='FontAwesome5' fontSize={20} />
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.content} scrollEnabled={false}>
                    <View style={styles.body}>
                        <Tabs scrollWithoutAnimation={false}>
                            <Tab heading='上演情報'>
                                <ActInfo />
                                <View style={styles.action}>
                                    <ArenaActionMaster />
                                </View>
                            </Tab>
                            <Tab heading='台本'>
                                <ScenarioMaster />
                                <View style={styles.action}>
                                    <ArenaActionMaster />
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
                <OverlayMessage />
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
        height: 70
    }
    , content: {
        
    }
    , body: {
        height: height - 70 - 2
        , justifyContent: 'center'
        , backgroundColor: '#333'
    }
    , action: {
        height: 60
        , alignSelf: 'center'
        , marginTop: 10
    }
});