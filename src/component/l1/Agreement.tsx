import React, {Component} from 'react';
import { WebView } from 'react-native-webview';
import { Button } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    onPress: () => void
    uri: string
}

@observer
export default class Agreement extends Component<props> {
    state = {
        reload: 0
    }

    render() {
        return (
            <Root>
                <Screen
                    key={this.state.reload}
                    source={{uri: this.props.uri}}
                />
                <AgreeButton onPress={this.props.onPress.bind(this)}>
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