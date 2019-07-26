import React, { Component } from 'react';
import { Container, View, Header, Left, Body, Right, Button, Title, Text } from 'native-base';

import { HomeScreenProps } from '../index'

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
            </Container>
        );
    }
}