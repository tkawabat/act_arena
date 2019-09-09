import React from 'react';
import { Container, View, Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';


import ScreenBase from './ScreenBase';

import ArenaStore from '../store/ArenaStore';
import ConfigStore from '../store/ConfigStore';

import LobbyCard from '../component/LobbyCard';


@observer
export default class LobbyScreen extends ScreenBase {
    
    constructor(props) {
        super(props);
    }
    
    private joinArena = () :void => {
        ConfigStore.load(true);
        ArenaStore.join(1).then(() => {
            ConfigStore.load(false);
        });
    }

    // private modal = () :void => {
    //     const { navigation } = this.props
    //     navigation.navigate('Modal')
    // }

    render() {
        return (
            <Container>
                <Spinner visible={ConfigStore.isLoad} />
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
            </Container>
        );
    }
}
