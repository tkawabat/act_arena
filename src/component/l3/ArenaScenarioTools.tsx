import React, { Component } from 'react';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';
import { Left, Right } from '../../lib/BasicModule';

import ArenaStore from '../../store/ArenaStore';
import ArenaScenarioStore from '../../store/ArenaScenarioStore';
import SkywayStore from '../../store/SkywayStore';
import UserStore from '../../store/UserStore';

import SquareTextIconButton from '../l1/SquareTextIconButton';
import ArenaAddTimeButton from '../l1/ArenaAddTimeButton';


@observer
export default class ArenaScenarioTools extends Component {

    render() {
        const isWait = ArenaStore.arenaState === C.ArenaState.WAIT;
        const isViewScenario = ArenaStore.arenaState !== C.ArenaState.WAIT && ArenaScenarioStore.isAgree;

        return (
            <Root>
                <Left>
                    <TextIconButton icon={'info'} text={'劇情報'} disabled={isWait} onPress={ArenaStore.setModal.bind(this, true)}/>
                    <TextIconButton icon={'home'} text={'規約'} disabled={isWait} onPress={ArenaScenarioStore.reloadAgreement}/>
                    <TextIconButton icon={'arrow-up'} text={'トップ'} disabled={!isViewScenario} onPress={ArenaScenarioStore.scroll2Top}/>
                    <TextIconButton icon={'redo'} text={'開始位置'} disabled={!isViewScenario} onPress={ArenaScenarioStore.scroll2Start}/>
                </Left>
                
                <Right>
                    <TextIconButton icon={'microphone'} text={'再接続'} onPress={SkywayStore.reconnect.bind(this, UserStore.id)}/>
                    <_ArenaAddTimeButton />
                </Right>
            </Root>
        );

    }
}

const Root = styled.View`
    height: 50px;
    margin-top: 5px;
    ${BasicStyle.screenWidth};
    flex-direction: row;
    align-items: center;
    background-color: ${BasicStyle.colorMiddle};
`

const TextIconButton = styled(SquareTextIconButton)`
    margin-left: 2.5px;
    margin-right: 2.5px;
`

const _ArenaAddTimeButton = styled(ArenaAddTimeButton)`
    margin-left: 2.5px;
    margin-right: 2.5px;
`