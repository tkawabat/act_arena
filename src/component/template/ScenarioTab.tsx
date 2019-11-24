import React, {Component} from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import ConfigStore from '../../store/ConfigStore';
import ArenaStore from '../../store/ArenaStore';

import ArenaExplain from '../ArenaExplain';
import Agreement from '../Agreement';
import Scenario from '../Scenario';
import ScenarioTools from '../organism/ScenarioTools';
import ScenarioFooter from '../organism/ScenarioFooter';


@observer
export default class ScenarioTab extends Component {

    render() {
        return (
            <Root>
                {ArenaStore.arenaState === C.ArenaState.WAIT && <ArenaExplain />}
                {ArenaStore.arenaState !== C.ArenaState.WAIT && !ArenaStore.isAgree && <Agreement />}
                {ArenaStore.arenaState !== C.ArenaState.WAIT && ArenaStore.isAgree && <Scenario />}
 
                {ArenaStore.arenaState !== C.ArenaState.WAIT && <ScenarioTools />}
                
                <ScenarioFooter />
            </Root>
        );
    }
}

const Root = styled.View`
    flex: 1;
`