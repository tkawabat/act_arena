import React, { Component } from 'react';
import { Container, View, Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import { observer } from 'mobx-react';

import ScreenProps from './ScreenProps';

import ArenaStore from '../store/ArenaStore';

import LobbyCard from '../component/LobbyCard';


@observer
export default class LobbyScreen extends Component<ScreenProps> {
    constructor(props) {
        super(props);
    }
    
    private joinArena = () :void => {
        ArenaStore.join(1);
    }

    // private modal = () :void => {
    //     const { navigation } = this.props
    //     navigation.navigate('Modal')
    // }

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

                <Button small iconRight onPress={() => ArenaStore.set()}>
                    <Text>set</Text>
                </Button>
                <Button small iconRight onPress={() => ArenaStore.update()}>
                    <Text>update</Text>
                </Button>
                <Button small iconRight onPress={() => ArenaStore.get('arena1')}>
                    <Text>get</Text>
                </Button>
                {/* 
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
