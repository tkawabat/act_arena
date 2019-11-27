import React, {Component} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, Body, Left, Right, Text, View, Button, Icon, Title, Tabs, Tab } from 'native-base';
import { observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';

import OverlayMessageStore from '../../store/OverlayMessageStore';

@observer
export default class OverlayMessage extends Component {
    render() {
        return (
            <Animatable.Text
                style={styles.body}
                animation={{
                    from: {translateX: OverlayMessageStore.from}
                    , to: {translateX: OverlayMessageStore.to}
                }}
                duration={OverlayMessageStore.duration}
                onAnimationEnd={OverlayMessageStore.animationEnd}
            >
                {OverlayMessageStore.message}
            </Animatable.Text>
        );
    }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    body: {
        top: height / 2 - 150,
        right: width,
        width: width,
        backgroundColor: 'rgba(255,255,255,0.8)',
        position: 'absolute',
        fontSize: 32,
        fontWeight: '600',
        textAlign: 'center',
        color: '#FF9900',
    }
});