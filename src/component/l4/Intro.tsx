import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';


interface props {
    done: () => void
}

const slides = [
    {
        title: 'アクト・アリーナとは？',
        text:
            '声劇をするまでの手間と時間をギュッと短縮するアプリ',
        icon: 'ios-images-outline',
        colors: ['#63E2FF', '#B066FE'],
    },
    {
        title: '必要なことはエントリーボタンを押すだけ',
        text:
            '',
        icon: 'ios-options-outline',
        colors: ['#A3A1FF', '#3A3897'],
    },
    {
        title: 'ユーザー登録をしてはじめよう！',
        text: 'まずはリスナーとしてアリーナを覗いてみよう',
        icon: 'ios-beer-outline',
        colors: ['#29ABE2', '#4F00BC'],
    },
];

export default class Intro extends Component<props> {
    _renderItem = ({ item, dimensions }) => (
        <LinearGradient
            style={[
                styles.mainContent,
                dimensions,
            ]}
            colors={item.colors}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0.1, y: 1 }}
        >
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        </LinearGradient>
    );

    render() {
        return <AppIntroSlider slides={slides} renderItem={this._renderItem} bottomButton onDone={this.props.done} />;
    }
}


const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    image: {
        width: 320,
        height: 320,
    },
    text: {
        fontSize: 20,
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 24,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 20,
    },
});