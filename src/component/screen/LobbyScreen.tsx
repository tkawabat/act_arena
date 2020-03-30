import React from 'react';
import { Header, Button, Title, Icon } from 'native-base';
import { observer } from 'mobx-react';

import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import ScreenBase from './ScreenBase';
import Navigator from '../../lib/Navigator';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaStore from '../../store/ArenaStore';
import ConfigStore from '../../store/ConfigStore';
import PushStore from '../../store/PushStore';
import UserStore from '../../store/UserStore';
import LobbyStore from '../../store/LobbyStore';

import Tips from '../l1/Tips';
import Bell from '../l1/Bell';
import PushSettingModal from '../l3/PushSettingModal';
import LobbyCardArena from '../l2/LobbyCardArena';
import LobbyCardPrivateArena from '../l2/LobbyCardPrivateArena';
import MatchingButton from '../l2/MatchingButton';
import LobbyCardTheater from '../l2/LobbyCardTheater';
import TestTellButton from '../l1/TestTellButton';


@observer
export default class LobbyScreen extends ScreenBase {
    
    constructor(props) {
        super(props);        
    }
    
    private joinArena = async (id:number) => {
        ConfigStore.load(true);
        ArenaStore.join(id).then(() => {
            ConfigStore.load(false);
        });
    }

    render() {
        const theaterList = Object.entries(LobbyStore.theaters)
            .map(([id, theater]) => (<LobbyCardTheater key={id} theaterId={id} theater={theater} />));
        return (
            <Root>
                <LobbyHeader>
                    <BasicStyle.Left>
                        <Bell onPress={PushStore.viewSettingModal} />
                    </BasicStyle.Left>
                    <BasicStyle.Center>
                        <Title>ロビー</Title>
                    </BasicStyle.Center>
                    <BasicStyle.Right>
                        <Button transparent onPress={Navigator.navigate.bind(this, 'Setting', null)} >
                            <ConfigIcon name='cog' type='FontAwesome5' />
                        </Button>
                    </BasicStyle.Right>
                </LobbyHeader>
                <ScreenBody>
                    <Section>
                        <TitleRow>
                            <ScreenTitle>3分アリーナ</ScreenTitle>
                            <_Tips text={'台本の一場面をその場で演じる新しい遊び方！'} />
                        </TitleRow>
                        <LobbyCardArena joinArena={this.joinArena} />
                        <LobbyCardPrivateArena joinArena={this.joinArena} />
                    </Section>
                    <Section>
                        <TitleRow>
                            <ScreenTitle>サシ劇マッチング</ScreenTitle>
                            <_Tips text={'読み10分 + 上演15~45分の約１時間の劇。\nエントリーは30分経つか、アプリを終了すると自動でキャンセルされます。'} />
                        </TitleRow>
                        <_MatchingButton />
                        {theaterList}
                    </Section>
                </ScreenBody>

                <Footer>
                    <TestTellButton />
                </Footer>

                <PushSettingModal />
            </Root>
        );
    }
}

const Root = styled.View`
    ${BasicStyle.screenRoot}
`

const LobbyHeader = styled(Header)`
    padding-top: 0;
    height: 50px;
`

const ConfigIcon = styled(Icon)`
    font-size: 24px;
    color: gray;
    margin-right: 5px;
`

const ScreenBody = styled.ScrollView`
    flex: 1;
`

const Section = styled.View`
    margin-bottom: 10px;
`;

const TitleRow = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${BasicStyle.colorMiddle};
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 10px;
`;

const ScreenTitle = styled.Text`    
    margin-left: 10px;
    font-size: 24px;
    font-weight: 500;
    color: #ddd;
`;

const _Tips = styled(Tips)`
    margin-left: 3px;
`;

const _MatchingButton = styled(MatchingButton)`
    align-self: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Footer = styled.View`
    background-color: #000044;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    height: 50px;
`