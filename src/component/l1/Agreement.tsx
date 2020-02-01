import React, {Component} from 'react';
import { WebView } from 'react-native-webview';
import { Button } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaScenarioStore from '../../store/ArenaScenarioStore';


const js = (agreementScroll: number) => {
    return `
// patch post message
var originalPostMessage = window.postMessage;
var patchedPostMessage = function(message, targetOrigin, transfer) { 
    originalPostMessage(message, targetOrigin, transfer);
};
patchedPostMessage.toString = function() { 
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage'); 
};
window.postMessage = patchedPostMessage;

function checkScroll() {
    var h = window.scrollY + window.parent.screen.height;
    if (h >= ${agreementScroll}) {
        window.ReactNativeWebView.postMessage('read');
    }    
}

window.addEventListener('scroll', checkScroll);
checkScroll();
`;
}

@observer
export default class Agreement extends Component {

    private onMessage = (event) => {
        const { data } = event.nativeEvent;
        if (data === 'read') {
            ArenaScenarioStore.readAgreement();
        }
    };

    render() {
        return (
            <Root>
                <Screen
                    javaScriptEnabled={true}
                    injectedJavaScript={js(ArenaScenarioStore.agreementScroll)}
                    source={{uri: ArenaScenarioStore.agreementUrl}}
                    onMessage={this.onMessage}
                />
                <AgreeButton
                    onPress={() => ArenaScenarioStore.setAgreement(C.AgreementState.AGREE)}
                    disabled={!ArenaScenarioStore.isReadAgreement}
                >
                    <AgreeButtonText>規約に同意</AgreeButtonText>
                </AgreeButton>
            </Root>
               );
    }
}

const Root = styled.View`
    flex: 1;
`

const Screen = styled(WebView)`
    flex: 1
`

const AgreeButton = styled(Button)`
    height: 40;
    width: 100;
    ${BasicStyle.center};
    margin-top: 5;
    margin-left: auto;
    margin-right: 10;
    padding: 10px;
`

const AgreeButtonText = styled.Text`
    color: #FFF;
    font-weight: 500;
`