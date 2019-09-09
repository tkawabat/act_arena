import React, {Component} from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Platform, StyleSheet, Text, View, WebView } from 'react-native';
import { observer } from 'mobx-react';

import * as C from '../lib/Const';
import ArenaStore from '../store/ArenaStore';

import Scenario from './Scenario';
import Agreement from './Agreement';


@observer
export default class ScenarioMaster extends Component {
    private reloadAgreement = () => {
        ArenaStore.setAgreement(C.AgreementState.NONE);
        //this.agreement.forceUpdate();
    }

    render() {
        return (
            <View style={styles.root}>
                {!ArenaStore.isAgree && <Agreement />}
                {ArenaStore.isAgree && <Scenario />}
                <Button style={styles.button} onPress={this.reloadAgreement}>
                    <Icon style={styles.icon} name='redo' type='FontAwesome5' />
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
        margin: 2,
    },
    icon: {
        color: '#000',
    },
});