import React, {Component} from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import ArenaStore from '../../store/ArenaStore';
import ArenaScenarioStore from '../../store/ArenaScenarioStore';

import ArenaExplain from '../l2/ArenaExplain';
import Agreement from '../l1/Agreement';
import ArenaScenario from '../l1/ArenaScenario';
import ArenaScenarioTools from '../l3/ArenaScenarioTools';
import ScenarioFooter from '../l3/ScenarioFooter';



@observer
export default class ArenaScenarioTab extends Component {

    render() {
        return (
            <Root>
                {ArenaStore.arenaState === C.ArenaState.WAIT && <ArenaExplain />}
                {ArenaStore.arenaState !== C.ArenaState.WAIT && !ArenaScenarioStore.isAgree && <Agreement />}
                {ArenaStore.arenaState !== C.ArenaState.WAIT && ArenaScenarioStore.isAgree && <ArenaScenario />}
 
                <ArenaScenarioTools />
                
                <ScenarioFooter />
            </Root>
        );
    }
}

const Root = styled.View`
    flex: 1;
`