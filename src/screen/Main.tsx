import React, { Component } from 'react';
import { Container, View, Header, Left, Body, Right, Button, Title, Text } from 'native-base';

import { HomeScreenProps } from 'src/index';
import Skyway from '../lib/Skyway';
import { observer } from 'mobx-react';
import Ob from '../component/Ob';

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
                    <Text>call</Text>
                </Button>
            </Container>
        );
    }
}
