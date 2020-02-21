import React, { Component } from 'react';
import { View } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';

import * as BasicStyle from '../../lib/BasicStyle';
import styled from 'styled-components/native';


interface props {
    done: () => void
}

const slides = [
    {
        key: '0',
        title: 'アクト・アリーナとは？',
        text:
            '声劇をするまでの手間と時間をギュッと短縮するアプリ',
        icon: 'ios-images-outline',
        colors: ['#63E2FF', '#B066FE'],
    },
    {
        key: '1',
        title: '必要なことはエントリーボタンを押すだけ',
        text:
            '',
        icon: 'ios-options-outline',
        colors: ['#A3A1FF', '#3A3897'],
    },
    {
        key: '2',
        title: 'ユーザー登録をしてはじめよう！',
        text: 'まずはリスナーとしてアリーナを覗いてみよう',
        icon: 'ios-beer-outline',
        colors: ['#29ABE2', '#4F00BC'],
    },
];

export default class Intro extends Component<props> {
    _renderItem = ({ item, dimensions }) => (
        <Root
            style={dimensions}
            colors={item.colors}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0.1, y: 1 }}
            key={item.key}
        >
            <View key={'Root'+(item.key)}>
                <Title key={'Title'+item.key}>{item.title}</Title>
                <Explain key={'Explain'+item.key}>{item.text}</Explain>
            </View>
        </Root>
    );

    render() {
        return <AppIntroSlider slides={slides} renderItem={this._renderItem} bottomButton onDone={this.props.done} />;
    }
}

const Root = styled(LinearGradient)`
    flex: 1;
    align-items: center;
    justify-content: space-around;
`

const Title = styled.Text`
    font-size: 24px;
    color: white;
    background-color: transparent;
    text-align: center;
    margin-bottom: 20px;

`

const Explain = styled.Text`
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
    background-color: transparent;
    text-align: center;
    padding-horizontal: 30px;
`