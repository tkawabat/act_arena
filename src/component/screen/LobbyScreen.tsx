import React from 'react';
import { observer } from 'mobx-react';

import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';
import { ScreenRoot, } from '../../lib/BasicModule';
import ScreenBase from './ScreenBase';
import Navigator from '../../lib/Navigator';

import ArenaStore from '../../store/ArenaStore';
import ConfigStore from '../../store/ConfigStore';
import LobbyStore from '../../store/LobbyStore';

import PushSettingModal from '../l3/PushSettingModal';
import LobbyHeader from '../l3/LobbyHeader';
import LobbyNotice from '../l2/LobbyNotice';
import LobbyCardArena from '../l2/LobbyCardArena';
import LobbyCardPrivateArena from '../l2/LobbyCardPrivateArena';
import MatchingButton from '../l2/MatchingButton';
import LobbyCardTheater from '../l2/LobbyCardTheater';
import TestTellButton from '../l1/TestTellButton';
import Tips from '../l1/Tips';


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
        const notices = ConfigStore.notices.map((notice, i) => (<LobbyNotice key={'notice'+i} text={notice} />));
        const theaterList = Object.entries(LobbyStore.theaters)
            .map(([id, theater]) => (<LobbyCardTheater key={id} theaterId={id} theater={theater} />));

        const tipsTheater = '読み10分 + 上演15~50分の約１時間の劇。'
            + '\nエントリーはバックグラウンドでも持続します。'
            + '\n演者として登録された劇があるときはエントリーできません。'

        return (
            <ScreenRoot>
                <LobbyHeader />
                <ScreenBody>
                    {notices}
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
                            <ScreenTitle>マッチング劇</ScreenTitle>
                            <_Tips text={tipsTheater} />
                        </TitleRow>
                        <_MatchingButton />
                        {theaterList}
                    </Section>
                </ScreenBody>

                <Footer>
                    <TestTellButton />
                </Footer>

                <PushSettingModal />
            </ScreenRoot>
        );
    }
}


const ScreenBody = styled.ScrollView`
    flex: 1;
`

const Section = styled.View`
    margin-bottom: 15px;
`;

const TitleRow = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${BasicStyle.colorLight};
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
    background-color: ${BasicStyle.colorLight};
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    height: 50px;
`