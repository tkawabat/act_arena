import React, { Component } from 'react';
import { Container, View, Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import { observer } from 'mobx-react';

import ScreenProps from './ScreenProps';

import SkywayStore from '../model/SkywayStore';
import Firebase from '../lib/Firebase';

@observer
export default class LobbyScreen extends Component<ScreenProps> {
    join = () => {
        const { navigation } = this.props;
        navigation.navigate('Push');
    }
    modal = () => {
        const { navigation } = this.props
        navigation.navigate('Modal')
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>ロビー</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <Button small iconRight primary onPress={this.join}>
                        <Text>プッシュ表示</Text>
                    </Button>
                </View>
                <View>
                    <Button small iconRight transparent primary onPress={this.modal}>
                        <Text>モーダル表示</Text>
                    </Button>
                </View>
                <Text>{SkywayStore.state.toString()}</Text>
                <Button small iconRight transparent onPress={() => SkywayStore.join()}>
                    <Text>join</Text>
                </Button>
                <Button small iconRight transparent onPress={() => SkywayStore.leave()}>
                    <Text>leave</Text>
                </Button>
                <Button small iconRight transparent onPress={() => SkywayStore.setLocalStreamStatus(true)}>
                    <Text>open</Text>
                </Button>
                <Button small iconRight transparent onPress={() => SkywayStore.setLocalStreamStatus(false)}>
                    <Text>close</Text>
                </Button>
                <Button small iconRight transparent onPress={() => Firebase.signup("random.matching@gmail.com", "cccccc")}>
                    <Text>signup</Text>
                </Button>
                <Button small iconRight transparent onPress={() => Firebase.login("random.matching@gmail.com", "cccccc")}>
                    <Text>login</Text>
                </Button>
                <Button small iconRight transparent onPress={() => Firebase.twitterLogin()}>
                    <Text>TwitterLogin</Text>
                </Button>
                <Button small iconRight transparent onPress={() => Firebase.anonymousLogin()}>
                    <Text>anonymousLogin</Text>
                </Button>
                <Button small iconRight transparent onPress={() => Firebase.logout()}>
                    <Text>logout</Text>
                </Button>
            </Container>
        );
    }
}
