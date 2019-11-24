import React, {Component} from 'react';
import { WebView } from 'react-native';
import { Button } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../lib/Const';
import * as BasicStyle from '../lib/BasicStyle';

import ArenaStore from '../store/ArenaStore';


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
        window.postMessage('read');
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
            ArenaStore.readAgreement();
        }
    };

    render() {
        return (
            <Root>
                <Screen
                    javaScriptEnabled={true}
                    injectedJavaScript={js(ArenaStore.agreementScroll)}
                    source={{uri: ArenaStore.agreementUrl}}
                    onMessage={this.onMessage}
                />
                <AgreeButton
                    onPress={() => ArenaStore.setAgreement(C.AgreementState.AGREE)}
                    disabled={!ArenaStore.isReadAgreement}
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
    margin-right: 10;
    padding: 10px;
`

const AgreeButtonText = styled.Text`
    color: #FFF;
    font-weight: 500;
`