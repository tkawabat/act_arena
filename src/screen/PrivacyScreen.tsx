import React from 'react';
import {StyleSheet, ScrollView, } from 'react-native';
import { Container, View, Header, Left, Body, Right, Button, Title, Text, Icon, H3 } from 'native-base';
import { observer } from 'mobx-react';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import Spinner from 'react-native-loading-spinner-overlay';

import PrivacyJson from '../../privacy.json';
import ScreenBase from './ScreenBase';
import Navigator from '../lib/Navigator';

import ConfigStore from '../store/ConfigStore';


@observer
export default class PrivacyScreen extends ScreenBase {
    
    constructor(props) {
        super(props);
    }

    private createChapters = () => {
        const ret = [];

        let i = 0;
        for (const key in PrivacyJson.chapters) {
            i++;
            ret.push(
                <H3 style={styles.chapterTitle}>{'第'+i+'章 '+key}</H3>
            );
            for (const t of PrivacyJson.chapters[key] as string[]) {
                ret.push(
                    <Text style={styles.sentence}>{t}</Text>
                );
            }
        }

        return ret;
    }

    render() {
        return (
            <Container style={styles.container}>
                <Spinner visible={ConfigStore.isLoad} />
                <Header style={styles.header}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' onPress={Navigator.back} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>プライバシーポリシー</Title>
                    </Body>
                    <Right />
                </Header>
                <ScrollView style={styles.scrollView}>
                    <Text>{PrivacyJson.preface}</Text>
                    {this.createChapters()}
                    <View style={styles.space}></View>
                </ScrollView>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: getStatusBarHeight(),
        marginBottom: getBottomSpace(),
    },
    header: {
        paddingTop: 0,
        height: 50,
    },
    scrollView: {
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    chapterTitle: {
        marginTop: 20,
        marginLeft: 5,
    },
    space: {
        height: 30,
    },
    sentence: {
        lineHeight: 24,
    }
});