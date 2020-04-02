import React from 'react';
import { ScrollView, } from 'react-native';
import { Text, H3 } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import ScreenBase from './ScreenBase';
import * as BasicStyle from '../../lib/BasicStyle';
import { ScreenRoot, } from '../../lib/BasicModule';
import Navigator from '../../lib/Navigator';
import PrivacyJson from '../../../privacy.json';

import ConfigStore from '../../store/ConfigStore';

import BasicHeader from '../l3/BasicHeader';


@observer
export default class PrivacyScreen extends ScreenBase {
    
    constructor(props) {
        super(props);
    }

    private createChapters = () => {
        const ret = [];

        let i = 0;
        let key;
        for (key in PrivacyJson.chapters) {
            i++;
            ret.push(
                <ChapterTitle key={i}>{'第'+i+'章 '+key}</ChapterTitle>
            );
            let j = 0;
            for (const t of PrivacyJson.chapters[key] as string[]) {
                ret.push(
                    <Sentence key={i*1000+j}>{t}</Sentence>
                );
                j++;
            }
        }

        return ret;
    }

    render() {
        return (
            <ScreenRoot>
                <BasicHeader title={'プライバシーポリシー'} back={true} />
                <ScrollView_>
                    <Text>{PrivacyJson.preface}</Text>
                    {this.createChapters()}
                    <Space />
                </ScrollView_>
            </ScreenRoot>
        );
    }
}


const ScrollView_ = styled(ScrollView)`
    margin-horizontal: 10px;
    padding-vertical: 10px;
    backgroundColor: white;
`

const ChapterTitle = styled(H3)`
    margin-top: 20px;
    margin-left: 5px;
`

const Space = styled.View`
    height: 30px;
`

const Sentence = styled.Text`
    line-height: 24px;
`