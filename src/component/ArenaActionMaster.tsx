import React, {Component} from 'react';
import { Text, View, Button, Icon } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import { observer } from 'mobx-react';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';

import ArenaStore from '../store/ArenaStore';
import UserStore from '../store/UserStore';

import Microphone from './Microphone';


@observer
export default class ArenaActionMaster extends Component {
    informationButton() {
        if (!ArenaStore.title || ArenaStore.title === '') return null;

        return (
            <Button transparent onPress={() => ArenaStore.setModal(true)}>
                <Icon name='info-circle' type='FontAwesome5' color='gray' />
            </Button>
        );
    }

    entryButton() {
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

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.left}>
                    {this.informationButton()}
                </View>
                <View style={styles.center}>
                {this.entryButton()}
                </View>
                <View style={styles.right}>
                </View>
            </View>
        )
    }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    root: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left: {
        flex: 1,
    },
    center: {
        flex: 1,
        alignItems: 'center',
    },
    right: {
        flex: 1,
    },
    buttonListner: {
        width: 120,
        height: 40,
        justifyContent: 'center',
    },
    buttonEntry: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '500',
    },
});