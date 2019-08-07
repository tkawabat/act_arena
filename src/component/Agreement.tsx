import React, {Component} from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Platform, StyleSheet, TouchableOpacity, TextInput, Text, View, WebView } from 'react-native';

let js : String = `
var post = true;

// patch post message
var originalPostMessage = window.postMessage;
var patchedPostMessage = function(message, targetOrigin, transfer) { 
    originalPostMessage(message, targetOrigin, transfer);
};
patchedPostMessage.toString = function() { 
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage'); 
};
window.postMessage = patchedPostMessage;

window.addEventListener('scroll', function() {
    var h = window.scrollY + window.parent.screen.height;
    if (post && h > 2500) {
        post = false;
        window.postMessage('read');
    }
});
`;

interface AgreementState {
read: boolean;
}

interface AgreementProps {
    url: string;
    onPress: Function;
}

export default class Agreement extends Component<AgreementProps, AgreementState> {
    public state : AgreementState = {
        read: false
    }

    private onMessage = (event) => {
        const { data } = event.nativeEvent;
        if (data === 'read') {
            this.setState({read: true});
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <WebView style={styles.webview}
                    javaScriptEnabled={true}
                    injectedJavaScript={js}
                    source={{uri: this.props.url}}
                    onMessage={this.onMessage}
                />
                <Button
                    style={styles.button}
                    onPress={this.props.onPress}
                    disabled={!this.state.read}
                    success={this.state.read}
                >
                    <Text style={styles.buttonText}>規約に同意</Text>
                </Button>
            </View>
               );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    button: {
        height: 50,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '500',
    },
    webview: {
    },
});
