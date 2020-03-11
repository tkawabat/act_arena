import React, {Component} from 'react';
import { WebView } from 'react-native-webview';
import { Button } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaScenarioStore from '../../store/ArenaScenarioStore';


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

    render() {
        return (
            <Root>
                <Screen
                    javaScriptEnabled={true}
                    ref={ref => this.webview = ref}
                    source={{uri: ArenaScenarioStore.agreementUrl}}
                />
                <AgreeButton onPress={ArenaScenarioStore.setAgreement.bind(this, C.AgreementState.AGREE)}>
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