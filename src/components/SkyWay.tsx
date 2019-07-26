import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { WebView } from 'react-native';

export default class SkyWay extends Component<{}> {
    jsCode : string = '';

    render() {
        return (
            <WebView
                source={{uri: 'https://random-matching.tokyo:3452/arena/'}}
                injectedJavaScript={this.jsCode}
                javaScriptEnabled={true}
                allowsInlineMediaPlayback={true}
            />
        );
    }
}