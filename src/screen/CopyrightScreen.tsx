import React from 'react';
import { StyleSheet, Dimensions, Linking } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, Title, Text, Icon, ListItem, Separator } from 'native-base';
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';


import ScreenBase from './ScreenBase';
import Navigator from '../lib/Navigator';

import ConfigStore from '../store/ConfigStore';


@observer
export default class CopyrightScreen extends ScreenBase {
    
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
                        <Title>著作権表示</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Separator bordered>
                        <Text>台本</Text>
                    </Separator>
                    <ListItem>
                        <Text>doodle.txt © 2008 ススキドミノ</Text>
                        <Icon name='external-link-alt' type='FontAwesome5' style={styles.linkIcon}
                            onPress={() =>  Linking.openURL('http://doodletxt.web.fc2.com/')} />
                    </ListItem>
                    <Separator bordered>
                        <Text>BGM</Text>
                    </Separator>
                    <ListItem>
                        <Text>騒音のない世界 © 2019 beco</Text>
                        <Icon name='external-link-alt' type='FontAwesome5' style={styles.linkIcon}
                            onPress={() =>  Linking.openURL('https://noiselessworld.net')} />
                    </ListItem>
                </Content>
            </Container>
        );
    }
}

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    linkIcon: {
        marginLeft: 'auto',
        fontSize: 20,
        color: 'gray',
    },
});