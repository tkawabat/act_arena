import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
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
    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render() {

        return (
            <Container>
                <Text>
                    {ArenaStore.time}
                </Text>
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