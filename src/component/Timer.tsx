import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, H1, H2, H3} from 'native-base';
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
    private time: number;
    componentDidMount() {
        console.log('timer componentDidMount');
    }

    componentDidUpdate() {
        console.log('timer componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('timer componentWillUnmount');
    }

    render() {
        return (
            <Container style={styles.root}>
                <H1>
                    {ArenaStore.time}
                </H1>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: 72
        , width: 72
        , textAlign: 'center'
        , color: '#FFF'
        , backgroundColor: 'blue'
        , fontWeight: '800'
        , margin: 10
    }
});