import React from 'react';
import { Container, Content, Header, Left, Body, Right, Button, Title, Text, Icon, List, ListItem, Separator } from 'native-base';
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
        const dataArray = [
            { title: '台本', content: 'Lorem ipsum dolor sit amet' },
            { title: 'BGM', content: 'Lorem ipsum dolor sit amet' },
            { title: 'プログラム', content: 'Lorem ipsum dolor sit amet' }
        ];

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
                        <Text>{'doodle.txt ススキドミノ様\nhttp://doodletxt.web.fc2.com/'}</Text>
                    </ListItem>
                    <ListItem last>
                        <Text>Lee Allen</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text>BGM</Text>
                    </Separator>
                    <ListItem>
                        <Text>Caroline Aaron</Text>
                    </ListItem>
                    <ListItem last>
                        <Text>Lee Allen</Text>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}
