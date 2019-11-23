import React, {Component} from 'react';
import { Button, Icon } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { observer } from 'mobx-react';

import * as C from '../../lib/Const';
import ConfigStore from '../../store/ConfigStore';
import ArenaStore from '../../store/ArenaStore';

import ArenaExplain from '../ArenaExplain';
import Agreement from '../Agreement';
import Scenario from '../Scenario';



@observer
export default class ScenarioTab extends Component {

    private addActTime = () => {
        ConfigStore.load(true);
        ArenaStore.asyncAddActTime().then(() => {
            ConfigStore.load(false);
        })
    }
    private reloadAgreement = () => {
        ArenaStore.setAgreement(C.AgreementState.NONE);
        //this.agreement.forceUpdate();
    }

    render() {
        return (
            <View style={styles.root}>
                {ArenaStore.arenaState === C.ArenaState.WAIT && <ArenaExplain />}
                {ArenaStore.arenaState !== C.ArenaState.WAIT && !ArenaStore.isAgree && <Agreement />}
                {ArenaStore.arenaState !== C.ArenaState.WAIT && ArenaStore.isAgree && <Scenario />}
                {ArenaStore.arenaState !== C.ArenaState.WAIT && 
                    <Button style={styles.reloadButton} onPress={this.reloadAgreement}>
                        <Icon style={styles.icon} name='redo' type='FontAwesome5' />
                    </Button>
                }
                {ArenaStore.arenaState === C.ArenaState.ACT
                    && ArenaStore.userState == C.ArenaUserState.ACTOR &&
                    <Button style={styles.addTimeButton} onPress={this.addActTime} disabled={!ArenaStore.addActTimeRemaind}>
                        <Text style={styles.addTimeButtonText}>+30秒</Text>
                    </Button>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    reloadButton: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
        margin: 2,
    },
    addTimeButton: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.2)',
        top: 70, 
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
        alignItems: 'center',
        margin: 2,
    },
    addTimeButtonText: {
        textAlign: 'center',
    },
    icon: {
        color: '#000',
    },
});