import React, {Component} from 'react';
import { WebView } from 'react-native-webview';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import ArenaStore from '../../store/ArenaStore';
import ArenaScenarioStore from '../../store/ArenaScenarioStore';

import ArenaExplain from '../l2/ArenaExplain';
import Agreement from '../l1/Agreement';
import ArenaScenario from '../l1/ArenaScenario';
import ArenaScenarioTools from '../l3/ArenaScenarioTools';
import ArenaScenarioFooter from '../l3/ArenaScenarioFooter';


@observer
export default class ArenaScenarioTab extends Component {
    private agreement:Agreement;

    constructor() {
        super();
        this.agreement = React.createRef();
        ArenaScenarioStore.reload = () => {
            if (!this.agreement.current) return;
            this.agreement.current.setState({reload: this.agreement.current.state.reload+1})
        };
    }

    render() {
        return (
            <Root>
                {ArenaStore.arenaState === C.ArenaState.WAIT && <ArenaExplain />}
                {ArenaStore.arenaState !== C.ArenaState.WAIT && !ArenaScenarioStore.isAgree
                    && <Agreement
                        ref={this.agreement}
                        onPress={ArenaScenarioStore.setAgreement.bind(this, C.AgreementState.AGREE)}
                        uri={ArenaScenarioStore.agreementUrl}
                    />}
                {ArenaStore.arenaState !== C.ArenaState.WAIT && ArenaScenarioStore.isAgree && <ArenaScenario />}
 
                <ArenaScenarioTools />                
                <ArenaScenarioFooter />
            </Root>
        );
    }
}

const Root = styled.View`
    flex: 1;
`