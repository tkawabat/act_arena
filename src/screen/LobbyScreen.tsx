import React, { Component } from 'react';
import { Container, View, Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import { observer } from 'mobx-react';

import ScreenProps from './ScreenProps';

import SkywayStore from '../model/SkywayStore';
import Firebase from '../lib/Firebase';

import LobbyCard from '../component/LobbyCard';

@observer
export default class LobbyScreen extends Component<ScreenProps> {
    constructor(props) {
        super(props);

        this.joinArena = this.joinArena.bind(this);
    }
    
    private joinArena() :void {
        const { navigation } = this.props;
        navigation.navigate('Push');
    }
    private modal() :void {
        const { navigation } = this.props
        navigation.navigate('Modal')
    }

    render() {
        const cardItems = [
            {
                
            }
        ]
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>ロビー</Title>
                    </Body>
                    <Right />
                </Header>
                <LobbyCard title='アリーナ' explain='ランダムマッチで3分で声劇体験！' onPress={this.joinArena} />
                <LobbyCard title='セリフバトル' explain='周りの投票で勝ち負けを決める！君の演技でいい感じに！' onPress={this.joinArena} />
                {/* <View>
                    <Button small iconRight primary onPress={this.join}>
                        <Text>プッシュ表示</Text>
                    </Button>
                </View>
                <View>
                    <Button small iconRight transparent primary onPress={this.modal}>
                        <Text>モーダル表示</Text>
                    </Button>
                </View> */}

                {/* <Button small iconRight transparent onPress={() => Firebase.signup("random.matching@gmail.com", "cccccc")}>
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
                </Button> */}
            </Container>
        );
    }
}
