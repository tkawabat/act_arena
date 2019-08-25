import React, {Component} from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Platform, StyleSheet, Text, View, WebView } from 'react-native';
import { observer } from 'mobx-react';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';

import UserStore from '../store/UserStore';
import ArenaStore from '../store/ArenaStore';

import Microphone from './Microphone';


@observer
export default class ArenaActionMaster extends Component {
    render() {
        if (!ArenaStore.users[UserStore.id]) {
            return null;
        } else if (ArenaStore.users[UserStore.id].state == C.ArenaUserState.LISTNER) {
            return (
                <Button
                    success={true}
                    style={styles.buttonListner}
                    onPress={() => ArenaStore.entry(C.ArenaUserState.ENTRY)}
                >
                    <Text style={styles.buttonText}>エントリー</Text>
                </Button>
                   );
        } else if (ArenaStore.users[UserStore.id].state == C.ArenaUserState.ENTRY) {
            return (
                <Button
                    success={true}
                    style={styles.buttonEntry}
                    onPress={() => ArenaStore.entry(C.ArenaUserState.LISTNER)}
                >
                    <Text style={styles.buttonText}>エントリー済</Text>
                </Button>
                   );
        } else if (ArenaStore.users[UserStore.id].state == C.ArenaUserState.ACTOR) {
            return (
                <Microphone />
            );   
        }

        
    }
}

const styles = StyleSheet.create({
    buttonListner: {
        width: 100
        , height: 40
        , justifyContent: 'center'
    }
    , buttonEntry: {
        width: 100
        , height: 40
        , justifyContent: 'center'
        , backgroundColor: '#ccc'
    }
    , buttonText: {
        color: '#FFF'
        , fontWeight: '500'
    }
});