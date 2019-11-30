import React from 'react';
import { StyleSheet, Dimensions, } from 'react-native';
import { Container, Content, View, Button, Icon, Title, Tabs, Tab, TabHeading, } from 'native-base';
import { observer } from 'mobx-react';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import Spinner from 'react-native-loading-spinner-overlay';


import ScreenBase from './ScreenBase';
import * as C from '../../lib/Const';

import ConfigStore from '../../store/ConfigStore';
import ArenaStore from '../../store/ArenaStore';
import ArenaUserStore from '../../store/ArenaUserStore';

import ActInfo from '../l2/ActInfo';
import ArenaHeader from '../l3/ArenaHeader';
import ChatTabHeader from '../l2/ChatTabHeader';
import ScenarioTabHeader from '../l2/ScenarioTabHeader';
import OverlayMessage from '../l2/OverlayMessage';
import ScenarioTab from '../l4/ScenarioTab';
import ChatTab from '../l4/ChatTab';


@observer
export default class Arena extends ScreenBase {
    private onChangeTab = (tab) => {
        switch (tab.ref.key) {
            case '.$scenario':
                ArenaStore.tab = C.ArenaTab.SCENARIO;
                break;
            case '.$chat':
                ArenaStore.tab = C.ArenaTab.CHAT;
                break;
        }
    }

    render() { 
        return (
            <Container style={styles.container}>
                <Spinner visible={ConfigStore.isLoad} />
                <ArenaHeader userNum={ArenaUserStore.userNum} />
                <Content style={styles.content} scrollEnabled={false}>
                    <View style={styles.body}>
                        <Tabs scrollWithoutAnimation={false} onChangeTab={this.onChangeTab} locked={true}>
                            <Tab
                                key={'scenario'}
                                heading={<TabHeading style={styles.tab}>
                                    <ScenarioTabHeader />
                                    </TabHeading>
                            }>
                                <ScenarioTab />
                                <ActInfo />
                            </Tab>
                            <Tab
                                key={'chat'}
                                heading={<TabHeading style={styles.tab}>
                                    <ChatTabHeader />
                                </TabHeading>}
                            >
                                <ChatTab />
                            </Tab>
                        </Tabs>
                    </View>
                </Content>
                <OverlayMessage />
            </Container>
        );
    }
}

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: getStatusBarHeight(),
        marginBottom: getBottomSpace(),
    },
    content: {
    },
    body: {
        height: height - 50 - getStatusBarHeight() - getBottomSpace(),
        justifyContent: 'center',
    },
    tab: {
        backgroundColor: '#000044',
    },
});