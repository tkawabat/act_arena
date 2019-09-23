import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, Button, Icon, Card } from "native-base";
import { observer } from 'mobx-react';

import * as C from '../lib/Const';
import ArenaStore from '../store/ArenaStore';


interface props {
    title: string
    , explain: string
    , onPress: () => void
}

@observer
export default class LobbyCard extends Component<props> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Card style={styles.root}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{this.props.title}</Text>
                        <View style={styles.userNum}>
                            <Icon name='user' type='FontAwesome5' style={styles.userNumIcon} />
                            <Text style={styles.userNumText}>{ArenaStore.userNum}/{C.RoomUserLimit}</Text>
                        </View>
                    </View>
                    <View style={styles.explain}>
                        <Text style={styles.explainText}>{this.props.explain}</Text>
                        <Icon name='sign-out-alt' type='FontAwesome5' />
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: 100,
        margin: 20,
        padding: 15,
        color: '#000',
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000044',
    },
    userNum: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        color: '#333',
    },
    userNumIcon: {
        fontSize: 16,
    },
    userNumText: {
        fontSize: 16,
        marginLeft: 2,
    },
    explain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    explainText: {
        marginLeft: 20
    },
});