import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, View, Header, Left, Body, Right, Button, Title, Text, Icon } from 'native-base';
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';


import ScreenBase from './ScreenBase';
import Navigator from '../lib/Navigator';

import ArenaStore from '../store/ArenaStore';
import ConfigStore from '../store/ConfigStore';
import SoundStore from '../store/SoundStore';

import LobbyCard from '../component/LobbyCard';


@observer
export default class LobbyScreen extends ScreenBase {
    
    constructor(props) {
        super(props);
    }
    
    private joinArena = (id:number) :void => {
        ConfigStore.load(true);
        ArenaStore.join(id).then(() => {
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
                    <Right>
                        <Button transparent onPress={() => Navigator.navigate('Setting', null)} >
                            <Icon name='cog' type='FontAwesome5' style={styles.config} />
                        </Button>
                    </Right>
                </Header>
                <View>
                    <LobbyCard
                        title='アリーナ'
                        explain='三分でぶち上がる劇体験！'
                        onPress={() => this.joinArena(0)}
                    />
                    <Button onPress={() => { SoundStore.playRondom(0.5); }}>
                        <Text>play</Text>
                    </Button>
                    <Button onPress={() => { SoundStore.stop(); }}>
                        <Text>stop</Text>
                    </Button>
                    <Button onPress={() => { SoundStore.setVolume(0.75); }}>
                        <Text>volume high</Text>
                    </Button>
                    <Button onPress={() => { SoundStore.setVolume(0.25); }}>
                        <Text>volume low</Text>
                    </Button>
                    <Button onPress={() => { SoundStore.decrementVolume(0.1); }}>
                        <Text>volume down</Text>
                    </Button>
                    <Button onPress={() => { SoundStore.fadeOut(); }}>
                        <Text>fadeout</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    config: {
        fontSize: 20,
        color: 'gray',
    },
});