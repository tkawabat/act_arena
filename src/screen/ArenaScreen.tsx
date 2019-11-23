import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Container, Content, Text, View, Button, Icon, Title, Tabs, Tab, TabHeading, Badge } from 'native-base';
import { observer } from 'mobx-react';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-loading-spinner-overlay';


import ScreenBase from './ScreenBase';
import * as C from '../lib/Const';

import ConfigStore from '../store/ConfigStore';
import ArenaStore from '../store/ArenaStore';
import UserStore from '../store/UserStore';

import ScenarioTab from '../component/template/ScenarioTab';
import ActInfo from '../component/ActInfo';
import ArenaHeader from '../component/ArenaHeader';
import ArenaFooter from '../component/ArenaFooter';
import ChatTabHeader from '../component/ChatTabHeader';
import ScenarioTabHeader from '../component/ScenarioTabHeader';
import OverlayMessage from '../component/OverlayMessage';


@observer
export default class Arena extends ScreenBase {
    private onChangeTab = (tab) => {
        switch (tab.ref.key) {
            case '.$scenario':
                ArenaStore.tab = C.ArenaTab.SCENARIO;
                break;
            case '.$chat':
                ArenaStore.tab = C.ArenaTab.CHAT;
                ArenaStore.readMessage();
                break;
        }
    }

    render() { 
        return (
            <Container style={styles.container}>
                <Spinner visible={ConfigStore.isLoad} />
                <ArenaHeader userNum={ArenaStore.userNum} />
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
                                <View style={styles.action}>
                                    {/* <ArenaActionMaster /> */}
                                    <ArenaFooter />
                                </View>
                                <ActInfo />
                            </Tab>
                            <Tab
                                key={'chat'}
                                heading={<TabHeading style={styles.tab}>
                                    <ChatTabHeader />
                                </TabHeading>}
                            >
                                <View style={{ flex: 1 }}>
                                    <GiftedChat
                                        messages={ArenaStore.messages}
                                        onSend={ArenaStore.addChat}
                                        onPressAvatar={ArenaStore.addNgListAlert}
                                        onLongPress={ArenaStore.reportChatAlert}
                                        dateFormat={'MM/DD'}
                                        timeFormat={'HH:mm'}
                                        maxInputLength={40}
                                        user={{
                                            _id: UserStore.id,
                                            name: UserStore.name
                                        }}
                                    />
                                    {Platform.OS === 'android' && <KeyboardSpacer />}
                                </View>
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
    action: {
        height: 60,
        marginTop: 5,
        alignItems: 'center',
    },
});