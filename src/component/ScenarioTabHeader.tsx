import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Button, Icon, Badge } from 'native-base';
import { observer } from 'mobx-react';

import ArenaStore from '../store/ArenaStore';


@observer
export default class ChatTabHeader extends Component {
    render() {
        return (
            <View style={styles.root}>
                <Text style={styles.title}>台本</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#FFF',
        fontWeight: '500',
    },
});