import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, WebView, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import * as C from '../lib/Const';
import User from '../model/User';


interface props {
    size: C.UserIconSize
    , user: User
}

export default class UserIcon extends Component<props> {
    render() {
        const url = this.props.user.icon_url;
        const styles = StyleSheet.create({
            width: this.props.size
            , height: this.props.size
        });
        
        console.log(styles);

        return (
            <Image
                source={{ uri: url }}
                style={styles}
            />
        );
    }
}

let styles = StyleSheet.create({
    image: {
        width: 12,
        height: 12
    }
});