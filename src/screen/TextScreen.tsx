import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { View, Text } from 'native-base';
import { observer } from 'mobx-react';

import ScreenBase from './ScreenBase';
import ConfigStore from '../store/ConfigStore';


@observer
export default class TextScreen extends ScreenBase {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.root}>
                <Text style={styles.text}>{ConfigStore.message}</Text>
            </View>
        );
    }
}

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    root: {
        height: height,
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '400',
    },
});