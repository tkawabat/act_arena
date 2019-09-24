import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, TextInput,  WebView } from 'react-native';
import { Text, View, Button, Icon, Title } from 'native-base';
import { observer } from 'mobx-react';

import * as C from '../lib/Const';


@observer
export default class ArenaExplain extends Component {

    render() {
        return (
            <View style={styles.root}>
                <Text style={styles.title}>アリーナの流れ</Text>
                <Text style={styles.subtitle}>1 {C.ArenaStateString[C.ArenaState.WAIT]}</Text>
                <Text style={styles.explain}>・画面の下の『エントリー』をぽちっ</Text>
                <Text style={styles.subtitle}>2 {C.ArenaStateString[C.ArenaState.CONFIRM]} ({C.ArenaStateTime[C.ArenaState.CONFIRM]}秒)</Text>
                <Text style={styles.explain}>・画面の下が<Icon name='microphone' type='FontAwesome5' style={styles.microphone}/>に変化</Text>
                <Text style={styles.explain}>・ミュートを解除、お互いの声が聞こえるか確認しよう</Text>
                <Text style={styles.subtitle}>3 {C.ArenaStateString[C.ArenaState.CHECK]} ({C.ArenaStateTime[C.ArenaState.CHECK]}秒)</Text>
                <Text style={styles.explain}>・規約をしっかり読んで、『同意』をぽちっ</Text>
                <Text style={styles.explain}>　※演じる箇所までは自動でスクロール</Text>
                <Text style={styles.explain}>・ストーリー、キャラ、セリフをチェック</Text>
                <Text style={styles.subtitle}>4 {C.ArenaStateString[C.ArenaState.ACT]} ({C.ArenaStateTime[C.ArenaState.ACT]}秒)</Text>
                <Text style={styles.explain}>・劇を開始！　思いっきり演じよう</Text>
            </View>
               );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
    },
    subtitle: {
        fontSize: 20,
        fontStyle: 'italic',
        marginTop: 20,
    },
    explain: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 5,
    },
    microphone: {
        fontSize: 12,
    },
});
