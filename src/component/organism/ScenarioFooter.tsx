import React, {Component} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View, Button, Icon, Badge } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaStore from '../../store/ArenaStore';

import EntryButton from '../atom/EntryButton';
import Microphone from '../atom/Microphone';


@observer
export default class ScenarioFooter extends Component {
    informationButton() {
        if (ArenaStore.arenaState === C.ArenaState.WAIT) return null;
        if (!ArenaStore.title || ArenaStore.title === '') return null;

        return (
            <Button transparent onPress={() => ArenaStore.setModal(true)}>
                <Icon style={styles.information} name='info-circle' type='FontAwesome5' />
            </Button>
        );
    }


    render() {
        const entryButton = ArenaStore.userState == C.ArenaUserState.ACTOR ?
            (<Microphone />) : (<EntryButton />)
            ;

        return (
            <Root>
                <View style={styles.left}>
                    {this.informationButton()}
                </View>
                <View style={styles.center}>
                    {entryButton}
                </View>
                <View style={styles.right}>
                    <Badge {...(C.ArenaUserStateStyle[ArenaStore.userState])} style={styles.badge}>
                        <Text style={styles.badgeText}>{C.ArenaUserStateString[ArenaStore.userState]}</Text>
                    </Badge>
                </View>
            </Root>
        )
    }
}

const Root = styled.View`
    height: 50;
    ${BasicStyle.screenWidth};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #000044;
`

const styles = StyleSheet.create({
    left: {
        flex: 1,
    },
    center: {
        flex: 1,
        alignItems: 'center',
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    information: {
        color: '#CC9900',
    },
    badge: {
        margin: 5,
    },
    badgeText: {
        fontSize: 12,
    }
});