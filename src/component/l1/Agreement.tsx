import React, {Component} from 'react';
import { WebView } from 'react-native-webview';
import { Button } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';
import * as WebViewJs from '../../lib/WebViewJs';

import ArenaScenarioStore from '../../store/ArenaScenarioStore';


const js = (agreementScroll: number) => {
    return `
${WebViewJs.init}

var timer;
function checkScroll() {
    var h;
    h = window.scrollY + window.parent.screen.height;
    if (h >= ${agreementScroll}) {
        window.ReactNativeWebView.postMessage('read');
        clearInterval(timer);
    }    
}

timer = setInterval(checkScroll, 500);
`;
}

@observer
export default class Agreement extends Component {
    private webview:WebView;

    constructor(props) {
        super(props);

        ArenaScenarioStore.reload = () => {
            if (!this.webview) return;
            this.webview.reload();
        }
    }

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
                    ref={ref => this.webview = ref}
                    injectedJavaScript={"setTimeout(function() {"+js(ArenaScenarioStore.agreementScroll)+"}, 0)"}
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
    height: 40px;
    width: 100px;
    ${BasicStyle.center};
    margin-top: 5px;
    margin-left: auto;
    margin-right: 10px;
    padding: 10px;
`

const AgreeButtonText = styled.Text`
    color: #FFF;
    font-weight: 500;
`