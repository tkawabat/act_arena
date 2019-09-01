import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Text, Body, Button, Card, CardItem } from "native-base";

import * as C from '../lib/Const';


interface props {
    title: string
    , explain: string
    , onPress: () => void
}

export default class LobbyCard extends Component<props> {
    render() {
        return (
            <Card>
                <CardItem button onPress={this.props.onPress} header>
                    <Text>{this.props.title}</Text>
                </CardItem>
                <CardItem button onPress={this.props.onPress}>
                    <Body>
                        <Text>
                            {this.props.explain}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    }
    , title: {

    }
    , explain: {

    }
});