import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Badge } from 'native-base';
import { observer } from 'mobx-react';

import ChatStore from '../../store/ChatStore';


@observer
export default class ChatTabHeader extends Component {
    private badge = () => {
        if (!ChatStore.unreadNumber) return null;
        return (
            <Badge>
                <Text style={styles.badge}>{ChatStore.unreadNumber.toString()}</Text>
            </Badge>
        );
    }

    render() {
        return (
            <View style={styles.root}>
                <Text style={styles.title}>チャット</Text>
                {this.badge()}
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
    badge: {
        fontSize: 12,
    },
});