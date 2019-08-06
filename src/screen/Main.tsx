import React, { Component } from 'react';
import { Container, View, Header, Left, Body, Right, Button, Title, Text } from 'native-base';

import { HomeScreenProps } from 'src/index';
import Skyway from '../lib/Skyway';
import { observer } from 'mobx-react';
import Ob from '../component/Ob';
import Firebase from '../lib/Firebase';

@observer
export default class Main extends Component<HomeScreenProps> {
    push = () => {
        const { navigation } = this.props
        navigation.navigate('Push')
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
                        <Title>メイン</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <Button small iconRight transparent primary onPress={this.push}>
                        <Text>プッシュ表示</Text>
                    </Button>
                </View>
                <View>
                    <Button small iconRight transparent primary onPress={this.modal}>
                        <Text>モーダル表示</Text>
                    </Button>
                </View>
                <Ob />
                <Text>{Skyway.state.toString()}</Text>
                <Button small iconRight transparent onPress={() => Skyway.join()}>
                    <Text>join</Text>
                </Button>
                <Button small iconRight transparent onPress={() => Skyway.leave()}>
                    <Text>leave</Text>
                </Button>
                <Button small iconRight transparent onPress={() => Skyway.setLocalStreamStatus(true)}>
                    <Text>open</Text>
                </Button>
                <Button small iconRight transparent onPress={() => Skyway.setLocalStreamStatus(false)}>
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
