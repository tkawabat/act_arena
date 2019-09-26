import Moment from 'moment';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Icon } from 'native-base';
import { observer } from 'mobx-react';

import ArenaStore from '../store/ArenaStore';


@observer
export default class Timer extends Component {
    render() {
        const time = ArenaStore.time > 0 ? ArenaStore.time.toString() : '---';
        return (
            <View style={styles.root}>
                <Icon name='clock' type='FontAwesome5' style={styles.clockIcon} />
                <Text style={styles.text}>{time}</Text>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        width: 80,
        height: 40,
        borderColor: '#555',
        textAlign: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '800',
        marginLeft: 5,
    },
    clockIcon: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'black',
    },
});