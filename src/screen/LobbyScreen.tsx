import React, { Component } from 'react';
import { Container, View, Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';


import ScreenProps from './ScreenProps';

import ArenaStore from '../store/ArenaStore';
import LoadStore from '../store/LoadStore';

import LobbyCard from '../component/LobbyCard';


@observer
export default class LobbyScreen extends Component<ScreenProps> {
    
    constructor(props) {
        super(props);
    }
    
    private joinArena = () :void => {
        LoadStore.load(true);
        ArenaStore.join(1).then(() => {
            LoadStore.load(false);
        });
    }

    // private modal = () :void => {
    //     const { navigation } = this.props
    //     navigation.navigate('Modal')
    // }

    render() {
        return (
            <Container>
                <Spinner visible={LoadStore.isLoad} />
                <Header>
                    <Left />
                    <Body>
                        <Title>ロビー</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <LobbyCard
                        title='アリーナ'
                        explain='三分でぶち上がる劇体験！'
                        onPress={this.joinArena}
                    />
                </View>
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
