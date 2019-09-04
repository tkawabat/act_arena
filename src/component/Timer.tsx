import Moment from 'moment';
import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container as View, Header, Left, Body, Right, Button, Icon, Title, H1 as Text, H2, H3} from 'native-base';
import { observer } from 'mobx-react';

import * as C from '../lib/Const';
import ArenaStore from '../store/ArenaStore';

interface props {
    // url: string;
    // start: string;
    // end: string;
}

@observer
export default class Timer extends Component<props> {
    render() {
        return (
            <View style={styles.root}>
                <Text style={styles.text}>{ArenaStore.time}</Text>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: 72
        , width: 72
        , textAlign: 'center'
        , justifyContent: 'center'
        //, color: '#FFF'
        //, backgroundColor: 'blue'
        , margin: 10
    }
    , text: {
        alignSelf: 'center'
        , fontSize: 20
        , fontWeight: '800'
    }
});