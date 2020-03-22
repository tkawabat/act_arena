import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Container, Tabs, Tab, TabHeading, } from 'native-base';
import { observer } from 'mobx-react';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';


import ScreenBase from './ScreenBase';
import * as C from '../../lib/Const';

import TheaterStore from '../../store/TheaterStore';
import TheaterUserStore from '../../store/TheaterUserStore';

import TheaterActInfoModal from '../l2/TheaterActInfoModal';
import TheaterHeader from '../l3/TheaterHeader';
import ChatTabHeader from '../l2/ChatTabHeader';
import ScenarioTabHeader from '../l2/ScenarioTabHeader';
import OverlayMessage from '../l2/OverlayMessage';
import TheaterScenarioTab from '../l4/TheaterScenarioTab';
import ChatTab from '../l4/ChatTab';


@observer
export default class TheaterScreen extends ScreenBase {
    private onChangeTab = (tab) => {
        switch (tab.ref.key) {
            case '.$scenario':
                TheaterStore.tab = C.TheaterTab.SCENARIO;
                break;
            case '.$chat':
                TheaterStore.tab = C.TheaterTab.CHAT;
                break;
        }
    }

    render() { 
        return (
            <Root>
                <TheaterHeader userNum={TheaterUserStore.userNum} />
                <Body>
                    <Tabs scrollWithoutAnimation={false} onChangeTab={this.onChangeTab} locked={true}>
                        <Tab
                            key={'scenario'}
                            heading={<TabHeading style={styles.tab}><ScenarioTabHeader /></TabHeading>}
                        >
                            <TheaterScenarioTab />
                            <TheaterActInfoModal />
                        </Tab>
                        <Tab
                            key={'chat'}
                            heading={<TabHeading style={styles.tab}><ChatTabHeader /></TabHeading>}
                        >
                            <ChatTab />
                        </Tab>
                    </Tabs>
                </Body>
                <OverlayMessage />
            </Root>
        );
    }
}

const {height, width} = Dimensions.get('window');

const Root = styled(Container)`
    flex: 1;
    margin-top: ${getStatusBarHeight()}px;
    margin-bottom: ${getBottomSpace()}px;
`;

const Body = styled.View`
    height: ${height - 50 - getStatusBarHeight() - getBottomSpace()}px;
`;

const styles = StyleSheet.create({
    tab: {
        backgroundColor: '#000044',
    },
});