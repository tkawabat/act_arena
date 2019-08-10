import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import ScreenProps from './ScreenProps';

export default class Modal extends Component<ScreenProps> {
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
