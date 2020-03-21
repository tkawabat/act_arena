import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import { Theater } from '../../model/TheaterModel';


interface props {
    uri: string
}

@observer
export default class Scenario extends Component<props> {

    render() {
        return (
            <Root>
                <WebView source={{ uri: this.props.uri }} />
            </Root>
        );
    }
}

const Root = styled.View`
    flex: 1;
`;