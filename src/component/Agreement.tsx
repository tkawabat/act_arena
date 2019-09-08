import React, {Component} from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { StyleSheet, TouchableOpacity, TextInput, Text, View, WebView } from 'react-native';
import { observer } from 'mobx-react';

import ArenaStore from '../store/ArenaStore';


const js = (agreementScroll: number) => {
    return `
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

function checkScroll() {
    var h = window.scrollY + window.parent.screen.height;
    if (post && h >= ${agreementScroll}) {
        post = false;
        window.postMessage('read');
    }    
}

window.addEventListener('scroll', checkScroll);
//checkScroll();
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
            <View style={styles.root}>
                <WebView style={styles.webview}
                    javaScriptEnabled={true}
                    injectedJavaScript={js(ArenaStore.agreementScroll)}
                    source={{uri: ArenaStore.agreementUrl}}
                    onMessage={this.onMessage}
                />
                <Button
                    style={styles.button}
                    onPress={ArenaStore.agree}
                    disabled={!ArenaStore.isReadAgreement}
                    success={ArenaStore.isReadAgreement}
                >
                    <Text style={styles.buttonText}>規約に同意</Text>
                </Button>
            </View>
               );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        //padding: 20,
    },
    button: {
        height: 40,
        width: 100,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        marginTop: 5,
        marginRight: 10,
        padding: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '500',
    },
    webview: {
    },
});
