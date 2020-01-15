import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import ScreenBase from './ScreenBase';

export default class Modal extends ScreenBase {
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
