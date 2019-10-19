import React from 'react';
import { StyleSheet, Alert, Platform, Dimensions, } from 'react-native';
import { Container, View, Header, Left, Body, Right, Button, Title, Text, Icon } from 'native-base';
import { observer } from 'mobx-react';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Permissions from 'react-native-permissions';

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

    private asyncCheckPermissions = async () => {
        const p = Platform.OS === 'ios' ? Permissions.PERMISSIONS.IOS.MICROPHONE : Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO;
        switch (await Permissions.check(p)) {
            case Permissions.RESULTS.UNAVAILABLE:
                alert('このデバイスではマイクをご利用いただけません。');
                return false;
            case Permissions.RESULTS.BLOCKED:
                Alert.alert('', 'アリーナに参加するためにはマイクの利用許可が必要です。', [
                    { text: '設定へ', onPress: Permissions.openSettings}
                    , { text: 'Cancel'}
                ]);
                return false;
            case Permissions.RESULTS.DENIED:
                if (Platform.OS === 'ios') {
                    Permissions.request(p);
                } else {
                    Alert.alert('', 'アリーナに参加するためにはマイクの利用許可が必要です。', [
                        { text: '設定へ', onPress: Permissions.openSettings }
                        , { text: 'Cancel' }
                    ]);
                }
                return false;
            case Permissions.RESULTS.GRANTED:
                return true;
        }
    }
    
    private joinArena = async (id:number) => {
        if (!await this.asyncCheckPermissions()) return;

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
            <Container style={styles.container}>
                <Spinner visible={ConfigStore.isLoad} />
                <Header style={styles.header}>
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
                        explain='３分で演じる名場面！'
                        onPress={() => this.joinArena(0)}
                    />
                </View>

                {/* <Button onPress={() => { SoundStore.playRondom(0.5, true); }}>
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
                <Button onPress={() => { SoundStore.incrementVolume(0.1); }}>
                    <Text>volume up</Text>
                </Button>
                <Button onPress={() => { SoundStore.decrementVolume(0.1); }}>
                    <Text>volume down</Text>
                </Button>
                <Button onPress={() => { SoundStore.fadeOut(); }}>
                    <Text>fadeout</Text>
                </Button> */}

            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: getStatusBarHeight(),
        marginBottom: getBottomSpace(),
    },
    header: {
        paddingTop: 0,
        height: 50,
    },
    config: {
        fontSize: 20,
        color: 'gray',
    },
});