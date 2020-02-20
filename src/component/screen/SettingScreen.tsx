import React from 'react';
import { StyleSheet} from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, Title, Text, Icon, List, ListItem, Separator } from 'native-base';
import { observer } from 'mobx-react';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import Spinner from 'react-native-loading-spinner-overlay';

import ScreenBase from './ScreenBase';
import Navigator from '../../lib/Navigator';
import * as BasicStyle from '../../lib/BasicStyle';

import ConfigStore from '../../store/ConfigStore';


@observer
export default class SettingScreen extends ScreenBase {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Spinner visible={ConfigStore.isLoad} />
                <Header style={styles.header}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' onPress={Navigator.back} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>設定</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {/* <Separator bordered>
                        <Text>その他</Text>
                    </Separator> */}
                    <ListItem>
                        <Button transparent onPress={() => Navigator.navigate('Terms', null)}>
                            <Text>利用規約</Text>
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button transparent onPress={() => Navigator.navigate('Privacy', null)}>
                            <Text>プライバシーポリシー</Text>
                        </Button>
                    </ListItem>
                    <ListItem last>
                        <Button transparent onPress={() => Navigator.navigate('Copyright', null)}>
                            <Text>著作権表示</Text>
                        </Button>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}

const Root = styled.View`
    ${BasicStyle.screenRoot}
`

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: getStatusBarHeight(),
        marginBottom: getBottomSpace(),
    },
    header: {
        paddingTop: 0,
        height: 50,
    },
});