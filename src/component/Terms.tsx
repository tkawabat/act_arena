import React, {Component} from 'react';
import { StyleSheet, ScrollView, } from 'react-native';
import { Text, H3} from "native-base";

import TermsJson from '../../terms.json';
import * as C from '../lib/Const';


export default class Terms extends Component {

    private createChapters = () => {
        const ret = [];

        let i = 0;
        for (const key in TermsJson.chapters) {
            i++;
            ret.push(
                <H3 style={styles.chapterTitle}>{'第'+i+'章 '+key}</H3>
            );
            for (const t of TermsJson.chapters[key] as string[]) {
                ret.push(
                    <Text style={styles.sentence}>{t}</Text>
                );
            }
        }

        return ret;
    }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <Text>{TermsJson.preface}</Text>
                {this.createChapters()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 10,
        height: 250,
        borderWidth: 2,
        borderColor: 'gray',
    },
    chapterTitle: {
        marginTop: 20,
        marginLeft: 5,
    },
    sentence: {
        lineHeight: 24,
    }
});