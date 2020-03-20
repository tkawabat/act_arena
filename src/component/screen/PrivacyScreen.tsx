import React from 'react';
import { ScrollView, } from 'react-native';
import { Container, View, Header, Left, Body, Right, Button, Title, Text, Icon, H3 } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import PrivacyJson from '../../../privacy.json';
import ScreenBase from './ScreenBase';
import Navigator from '../../lib/Navigator';
import * as BasicStyle from '../../lib/BasicStyle';

import ConfigStore from '../../store/ConfigStore';


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
            <Root>
                <Header_>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' onPress={Navigator.back} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>プライバシーポリシー</Title>
                    </Body>
                    <Right />
                </Header_>
                <ScrollView_>
                    <Text>{PrivacyJson.preface}</Text>
                    {this.createChapters()}
                    <Space />
                </ScrollView_>
            </Root>
        );
    }
}


const Root = styled.View`
    ${BasicStyle.screenRoot}
`

const Header_ = styled(Header)`
    ${BasicStyle.header}
`

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