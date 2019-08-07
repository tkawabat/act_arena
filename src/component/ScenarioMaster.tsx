import React, {Component} from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Platform, StyleSheet, Text, View, WebView } from 'react-native';
import Scenario from './Scenario';
import Agreement from './Agreement';

interface ScenarioMasterState {
    agree: boolean,
}
interface ScenarioMasterProps {
    agreement: string;
    agree_scroll: number;
    url: string;
    start: string;
    end: string;
}

export default class ScenarioMaster extends Component<ScenarioMasterProps, ScenarioMasterState> {
    public state : ScenarioMasterState = {
        agree: false
    }

    private agree = () => {
        this.setState({agree: true});
    }

    render() {
        if (!this.state.agree) {
            return (
                    <Agreement
                    url={this.props.agreement}
                    onPress={this.agree}
                    />
                   );
        } else {
            return (
                    <Scenario
                    url={this.props.url}
                    start={this.props.start}
                    end={this.props.end}
                    />
                   );

        }
    }
}
