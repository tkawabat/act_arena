import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, H1, H2, H3} from 'native-base';
import { observer } from 'mobx-react';

import * as C from '../lib/Const';
import ArenaStore from '../model/ArenaStore';

interface props {
    // url: string;
    // start: string;
    // end: string;
}

@observer
export default class Timer extends Component<props> {
    private time: number;
    componentDidMount() {
        console.log('chat componentDidMount');
    }

    componentDidUpdate() {
        console.log('chat componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('chat componentWillUnmount');
    }

    render() {

        return (
            <Container>
                <H1>
                    {ArenaStore.time}
                </H1>
                <Button onPress={() => ArenaStore.decrement()}>
                    <Text>-1</Text>
                </Button>
                <Button onPress={() => ArenaStore.hoge()}>
                    <Text>hoge</Text>
                </Button>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    welcome: {
        height: 100,
        fontSize: 20,
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: 'gray',
        margin: 10,
    }
});