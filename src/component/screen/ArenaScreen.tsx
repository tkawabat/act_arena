import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Container, Tabs, Tab, TabHeading, } from 'native-base';
import { observer } from 'mobx-react';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';


import ScreenBase from './ScreenBase';
import * as C from '../../lib/Const';

import ArenaStore from '../../store/ArenaStore';
import ArenaUserStore from '../../store/ArenaUserStore';

import ActInfoModal from '../l2/ActInfoModal';
import ArenaHeader from '../l3/ArenaHeader';
import ChatTabHeader from '../l2/ChatTabHeader';
import ScenarioTabHeader from '../l2/ScenarioTabHeader';
import OverlayMessage from '../l2/OverlayMessage';
import ScenarioTab from '../l4/ScenarioTab';
import ChatTab from '../l4/ChatTab';


@observer
export default class ArenaScreen extends ScreenBase {
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
            <Root>
                <ArenaHeader userNum={ArenaUserStore.userNum} />
                <Body>
                    <Tabs scrollWithoutAnimation={false} onChangeTab={this.onChangeTab} locked={true}>
                        <Tab
                            key={'scenario'}
                            heading={<TabHeading style={styles.tab}><ScenarioTabHeader /></TabHeading>}
                        >
                            <ScenarioTab />
                            <ActInfoModal />
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