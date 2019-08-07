import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, WebView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import * as C from '../model/Const';
import User from '../model/User';

import UserIcon from './UserIcon';


interface props {
    // url: string;
    // start: string;
    // end: string;
}

export default class ActInfo extends Component<props> {
    render() {
        const user: User = {
            id: 'a'
            , name: 'b'
            , sex: C.Sex.Female
            , icon_url: 'https://facebook.github.io/react-native/img/header_logo.png'
        };

        return (
            <Container style={styles.welcome}>
                <Text>
                    上演情報
                </Text>
                <UserIcon size={C.UserIconSize.S} user={user} />
                <UserIcon size={C.UserIconSize.M} user={user} />
                <UserIcon size={C.UserIconSize.L} user={user} />
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