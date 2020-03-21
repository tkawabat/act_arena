import React, {Component} from 'react';
import { WebView } from 'react-native-webview';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';

import TheaterStore from '../../store/TheaterStore';

import Agreement from '../l1/Agreement';
import Scenario from '../l1/Scenario';
import ArenaScenarioTools from '../l3/ArenaScenarioTools';
import ArenaScenarioFooter from '../l3/ArenaScenarioFooter';


@observer
export default class TheaterScenarioTab extends Component {
    private webview:WebView;
    private setWebView = (webview:WebView) => { this.webview = webview; }

    render() {
        return (
            <Root>
                {TheaterStore.agreement ?
                    <Scenario uri={TheaterStore.scenarioUrl} />
                    : <Agreement 
                        onPress={TheaterStore.setAgreement.bind(this, true)}
                        setter={this.setWebView}
                        uri={TheaterStore.agreementUrl}
                    />}
 
                <ArenaScenarioTools />
                <ArenaScenarioFooter />
            </Root>
        );
    }
}

const Root = styled.View`
    flex: 1;
`