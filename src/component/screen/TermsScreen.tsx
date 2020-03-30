import React from 'react';
import {StyleSheet, ScrollView, } from 'react-native';
import { Container, View, Text, H3 } from 'native-base';
import { observer } from 'mobx-react';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

import TermsJson from '../../../terms.json';
import ScreenBase from './ScreenBase';
import Navigator from '../../lib/Navigator';

import BasicHeader from '../l3/BasicHeader';


@observer
export default class TermsScreen extends ScreenBase {
    
    constructor(props) {
        super(props);
    }

    private createChapters = () => {
        const ret = [];

        let i = 0;
        let key;
        for (key in TermsJson.chapters) {
            i++;
            ret.push(
                <H3 style={styles.chapterTitle} key={i}>{'第'+i+'章 '+key}</H3>
            );
            let j = 0;
            for (const t of TermsJson.chapters[key] as string[]) {
                ret.push(
                    <Text style={styles.sentence} key={i*1000+j}>{t}</Text>
                );
                j++;
            }
        }

        return ret;
    }

    render() {
        return (
            <Container style={styles.container}>
                <BasicHeader title={'利用規約'} back={true} />
                <ScrollView style={styles.scrollView}>
                    <Text>{TermsJson.preface}</Text>
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