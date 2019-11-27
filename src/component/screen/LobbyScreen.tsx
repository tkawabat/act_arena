import React from 'react';
import { StyleSheet, Alert, Platform, Dimensions, } from 'react-native';
import { Container, View, Header, Left, Body, Right, Button, Title, Text, Icon } from 'native-base';
import { observer } from 'mobx-react';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Permissions from 'react-native-permissions';

import ScreenBase from './ScreenBase';
import Navigator from '../../lib/Navigator';

import ArenaStore from '../../store/ArenaStore';
import ConfigStore from '../../store/ConfigStore';
import SoundStore from '../../store/SoundStore';

import LobbyCard from '../LobbyCard';


@observer
export default class LobbyScreen extends ScreenBase {
    
    constructor(props) {
        super(props);
        
    }

    private asyncCheckIosPermissions = async () => {
        const p = Permissions.PERMISSIONS.IOS.MICROPHONE;
        switch (await Permissions.check(p)) {
            case Permissions.RESULTS.UNAVAILABLE:
                alert('このデバイスではマイクをご利用できないため、アリーナに参加できません。');
                return false;
            case Permissions.RESULTS.BLOCKED:
                Alert.alert('', 'アリーナに参加するためにはマイクの利用許可が必要です。', [
                    { text: '設定へ', onPress: Permissions.openSettings}
                    , { text: 'Cancel'}
                ]);
                return false;
            case Permissions.RESULTS.DENIED:
                Permissions.request(p);
                return false;
            case Permissions.RESULTS.GRANTED:
                return true;
        }
    }

    private asyncCheckAndroidPermissions = async () => {
        const microphone = await Permissions.check(Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO);
        const camera = await Permissions.check(Permissions.PERMISSIONS.ANDROID.CAMERA);
        if (microphone === Permissions.RESULTS.UNAVAILABLE || camera === Permissions.RESULTS.UNAVAILABLE) {
            alert('このデバイスではマイク・カメラをご利用できないため、アリーナに参加できません。');
            return false;
        }

        if (microphone === Permissions.RESULTS.GRANTED && camera === Permissions.RESULTS.GRANTED) {
            return true;
        }
        
        Alert.alert('', 'アリーナに参加するためにはマイク・カメラの利用許可が必要です。（カメラは実際には使用しません。）', [
            { text: '設定へ', onPress: Permissions.openSettings }
            , { text: 'Cancel' }
        ]);

        return false;
    }
    
    private joinArena = async (id:number) => {
        if (Platform.OS === 'ios') {
            if (!await this.asyncCheckIosPermissions()) return;
        } else {
            if (!await this.asyncCheckAndroidPermissions()) return;
        }

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
                        explain='４分で演じる名場面！'
                        onPress={() => this.joinArena(0)}
                    />
                </View>

                {/* <Button onPress={() => { SoundStore.se('actStart'); }}>
                    <Text>actStart</Text>
                </Button>
                <Button onPress={() => { SoundStore.se('matching'); }}>
                    <Text>matching</Text>
                </Button>
                <Button onPress={() => { SoundStore.se('enterRoom'); }}>
                    <Text>enterRoom</Text>
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