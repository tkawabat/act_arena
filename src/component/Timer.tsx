import Moment from 'moment';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { observer } from 'mobx-react';

import ArenaStore from '../store/ArenaStore';


@observer
export default class Timer extends Component {
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
        , width: 60
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