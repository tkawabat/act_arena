import React, {Component} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View, Button, Icon, Badge } from 'native-base';
import { observer } from 'mobx-react';

import * as C from '../lib/Const';

import ArenaStore from '../store/ArenaStore';

import EntryButton from './atom/EntryButton';
import Microphone from './atom/Microphone';


@observer
export default class ArenaFooter extends Component {
    informationButton() {
        if (ArenaStore.arenaState === C.ArenaState.WAIT) return null;
        if (!ArenaStore.title || ArenaStore.title === '') return null;

        return (
            <Button transparent onPress={() => ArenaStore.setModal(true)}>
                <Icon style={styles.information} name='info-circle' type='FontAwesome5' />
            </Button>
        );
    }


    render() {
        const entryButton = ArenaStore.userState == C.ArenaUserState.ACTOR ?
            (<Microphone />) : (<EntryButton />)
            ;

        return (
            <View style={styles.root}>
                <View style={styles.left}>
                    {this.informationButton()}
                </View>
                <View style={styles.center}>
                    {entryButton}
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