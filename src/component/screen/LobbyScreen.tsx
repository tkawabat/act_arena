import React from 'react';
import { Alert, Platform, } from 'react-native';
import { Header, Button, Title, Icon } from 'native-base';
import { observer } from 'mobx-react';
import * as Permissions from 'react-native-permissions';
import { showMessage, hideMessage } from "react-native-flash-message";
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import ScreenBase from './ScreenBase';
import Navigator from '../../lib/Navigator';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaStore from '../../store/ArenaStore';
import ConfigStore from '../../store/ConfigStore';
import PushStore from '../../store/PushStore';
import SkywayStore from '../../store/SkywayStore';
import UserStore from '../../store/UserStore';
import LobbyStore from '../../store/LobbyStore';

import Bell from '../l1/Bell';
import RectangleTextButton from '../l1/RectangleTextButton';
import PushSettingModal from '../l3/PushSettingModal';
import LobbyCardArena from '../l2/LobbyCardArena';
import LobbyCardPrivateArena from '../l2/LobbyCardPrivateArena';
import LobbyCardMatching from '../l2/LobbyCardMatching';
import LobbyCardTheater from '../l2/LobbyCardTheater';
import TestTellButton from '../l1/TestTellButton';


@observer
export default class LobbyScreen extends ScreenBase {
    
    constructor(props) {
        super(props);        
    }

    private asyncCheckPermissions = async () => {
        let ret:boolean = false;
        if (Platform.OS === 'ios') {
            ret = await this.asyncCheckIosPermissions();
        } else {
            ret = await this.asyncCheckAndroidPermissions();
        }
        return ret;
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
        const microphone = await Permissions.request(Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO);
        const camera = await Permissions.request(Permissions.PERMISSIONS.ANDROID.CAMERA);
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
        const p = await this.asyncCheckPermissions();
        if (!p) return;

        ConfigStore.load(true);
        ArenaStore.join(id).then(() => {
            ConfigStore.load(false);
        });
    }

    private testTell = async () => {
        const p = await this.asyncCheckPermissions();
        if (!p) return;
        SkywayStore.testTell(UserStore.id);
    }

    render() {
        const theaterList = LobbyStore.theaters.map((theater) => (<LobbyCardTheater theater={theater} />));
        return (
            <Root>
                <LobbyHeader>
                    <Left>
                        <Bell onPress={PushStore.viewSettingModal} />
                    </Left>
                    <Center>
                        <Title>ロビー</Title>
                    </Center>
                    <Right>
                        <Button transparent onPress={Navigator.navigate.bind(this, 'Setting', null)} >
                            <ConfigIcon name='cog' type='FontAwesome5' />
                        </Button>
                    </Right>
                </LobbyHeader>
                <ScreenBody>
                    <LobbyCardArena joinArena={this.joinArena} />
                    <LobbyCardPrivateArena joinArena={this.joinArena} />
                    <LobbyCardMatching />
                    {theaterList}
                </ScreenBody>

                <Footer>
                    <RectangleTextButton text='テスト' onPress={showMessage.bind(this, {
                        autoHide: false,
                        message: 'サシ劇マッチングしました。　⇛長押しして入室。',
                        titleStyle: { fontSize: 16, fontFamily: 'arial black' },
                    })} />
                    <TestTellButton onPress={this.testTell}></TestTellButton>
                </Footer>

                <PushSettingModal />
            </Root>
        );
    }
}

const Root = styled.ScrollView`
    ${BasicStyle.screenRoot}
`

const Left = styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
`

const Center = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Right = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`

const ScreenBody = styled.View`
    flex: 1;
`

const LobbyHeader = styled(Header)`
    padding-top: 0;
    height: 50px;
`

const Footer = styled.View`
    height: 50px;
    margin: 10px;
    flex-direction: row;
    justify-content: flex-end;
`

const ConfigIcon = styled(Icon)`
    font-size: 24px;
    color: gray;
    margin-right: 5px;
`
