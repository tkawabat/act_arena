import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import { HomeScreenProps } from '../index'

export default class Modal extends Component<HomeScreenProps> {
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>モーダル</Title>
                    </Body>
                    <Right />
                </Header>
            </Container>
        );
    }
}