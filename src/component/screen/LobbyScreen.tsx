import React from 'react';
import { Alert, Platform, } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text, Icon } from 'native-base';
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Permissions from 'react-native-permissions';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import ScreenBase from './ScreenBase';
import Navigator from '../../lib/Navigator';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaStore from '../../store/ArenaStore';
import ConfigStore from '../../store/ConfigStore';
import LobbyStore from '../../store/LobbyStore';

import LobbyCard from '../l2/LobbyCard';
import TestTellButton from '../l1/TestTellButton';


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
            <Root>
                <Spinner visible={ConfigStore.isLoad} />
                <LobbyHeader>
                    <Left />
                    <Body>
                        <Title>ロビー</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => Navigator.navigate('Setting', null)} >
                            <ConfigIcon name='cog' type='FontAwesome5' />
                        </Button>
                    </Right>
                </LobbyHeader>
                <ScreenBody>
                    <LobbyCard
                        title='アリーナ'
                        explain='3分で演じる名場面！'
                        userNumText={ (LobbyStore.userNum/C.RoomUserLimit).toString() }
                        onPress={() => this.joinArena(0)}
                    />
                </ScreenBody>

                <Footer>
                    <TestTellButton></TestTellButton>
                </Footer>

            </Root>
        );
    }
}

const Root = styled.View`
    ${BasicStyle.screenRoot}
`

const ScreenBody = styled.View`
    flex: 1;
`

const LobbyHeader = styled(Header)`
    padding-top: 0;
    height: 50;
`

const Footer = styled.View`
    height: 50;
    margin: 10px;
    flex-direction: row;
    justify-content: flex-end;
`

const ConfigIcon = styled(Icon)`
    font-size: 20;
    color: gray;
`