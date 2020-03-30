import React from 'react';
import { Content, Button, Text, ListItem, } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import ScreenBase from './ScreenBase';
import Navigator from '../../lib/Navigator';
import * as BasicStyle from '../../lib/BasicStyle';
import { ScreenRoot, } from '../../lib/BasicModule';

import BasicHeader from '../l3/BasicHeader';


@observer
export default class SettingScreen extends ScreenBase {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScreenRoot>
                <BasicHeader title={'設定'} back={true} />
                <Content>
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
            </ScreenRoot>
        );
    }
}