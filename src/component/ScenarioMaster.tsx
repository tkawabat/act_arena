import React, {Component} from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Platform, StyleSheet, Text, View, WebView } from 'react-native';
import { observer } from 'mobx-react';

import ArenaStore from '../model/ArenaStore';

import Scenario from './Scenario';
import Agreement from './Agreement';


@observer
export default class ScenarioMaster extends Component {
    render() {
        if (ArenaStore.isAgree) {
            return (
                    <Agreement />
                   );
        } else {
            return (
                    <Scenario />
                   );

        }
    }
}