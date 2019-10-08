import React, {Component} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View, Button, Icon, Badge } from 'native-base';
import { observer } from 'mobx-react';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';

import ArenaStore from '../store/ArenaStore';
import UserStore from '../store/UserStore';

import Microphone from './Microphone';


@observer
export default class ArenaActionMaster extends Component {
    informationButton() {
        if (ArenaStore.arenaState === C.ArenaState.WAIT) return null;
        if (!ArenaStore.title || ArenaStore.title === '') return null;

        return (
            <Button transparent onPress={() => ArenaStore.setModal(true)}>
                <Icon style={styles.information} name='info-circle' type='FontAwesome5' />
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
                    <Badge {...(C.ArenaUserStateStyle[ArenaStore.userState])} style={styles.badge}>
                        <Text style={styles.badgeText}>{C.ArenaUserStateString[ArenaStore.userState]}</Text>
                    </Badge>
                </View>
            </View>
        )
    }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000044',
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        backgroundColor: '#CCC',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '500',
    },
    information: {
        color: '#CC9900',
    },
    badge: {
        margin: 5,
    },
    badgeText: {
        fontSize: 12,
    }
});