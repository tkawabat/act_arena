import React from 'react';
import { Container, View, Header, Left, Body, Right, Button, Title, Text, Icon, List, ListItem, Separator } from 'native-base';
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';


import ScreenBase from './ScreenBase';
import Navigator from '../lib/Navigator';

import ConfigStore from '../store/ConfigStore';


@observer
export default class TermsScreen extends ScreenBase {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Spinner visible={ConfigStore.isLoad} />
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' onPress={Navigator.back} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>利用規約</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                </View>
            </Container>
        );
    }
}
