import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Body, Left, Right, Text, View, Button, Icon, Title, Tabs, Tab } from 'native-base';

import * as C from '../lib/Const';
import UserStore, {User} from '../store/UserStore';
import ArenaStore from '../store/ArenaStore';

import UserIcon from './UserIcon';


export default class ActInfo extends Component {
    render() {
        const user: User = {
            id: 'a'
            , name: 'b'
            , gender: C.Gender.Female
            , iconUrl: 'https://facebook.github.io/react-native/img/header_logo.png'
        };

        return (
            <View style={styles.body}>
                <Text>{ArenaStore.title}</Text>
                {/* <UserIcon size={C.UserIconSize.S} user={user} /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        //height: 100,
        fontSize: 20,
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: 'gray',
        margin: 10,
    }
});