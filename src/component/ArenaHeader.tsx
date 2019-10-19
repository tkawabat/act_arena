import React, {Component} from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { Text, Header, Title, View, Button, Icon } from 'native-base';
import { observer } from 'mobx-react';

import * as C from '../lib/Const';
import Amplitude from '../lib/Amplitude';

import ArenaStore from '../store/ArenaStore';


import Timer from '../component/Timer';


@observer
export default class ArenaHeader extends Component {

    private leave = () => {
        Alert.alert('', 'アリーナから退出します。', [
            { text: 'OK', onPress: ArenaStore.leave}
            , { text: 'Cancel'}
        ]);
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.left}>
                    <View style={styles.timer}>
                        <Timer />
                    </View>
                </View>
                <View style={styles.center}>
                    <Title style={styles.title}>{C.ArenaStateString[ArenaStore.arenaState]}</Title>
                </View>
                <View style={styles.right}>
                    <Icon name='user' type='FontAwesome5' style={styles.userNumIcon} />
                    <Text style={styles.userNumText}>{ArenaStore.userNum}</Text>
                    <Button transparent onPress={this.leave} disabled={!ArenaStore.canLeave}>
                        <Icon name='sign-out-alt' type='FontAwesome5' fontSize={20} />
                    </Button>
                </View>
            </View>
        )
    }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    root: {
        //flex: 1,
        width: width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: '#000044',
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    center: {
        flex: 1,
        alignItems: 'center',
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    title: {
        color: 'black',
        fontWeight: '800',
    },
    timer: {
        marginLeft: 20,
    },
    userNumIcon: {
        fontSize: 16,
    },
    userNumText: {
        fontSize: 16,
        marginLeft: 2,
        marginRight: 5,
    },
});