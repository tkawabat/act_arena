import React, { Component } from 'react';
import { View, Icon, Button } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    icon: string,
    text: string,
    onPress: () => void,
}

export default class SquareTextIconButton extends Component<props> {

    render() {
        return (
            <Root onPress={this.props.onPress}>
                <_Icon name={this.props.icon} type='FontAwesome5' />
                <Text>{this.props.text}</Text>
            </Root>
        );

    }
}

const Root = styled.TouchableOpacity`
    ${BasicStyle.squareButtonBase};
`

const _Icon = styled(Icon)`
    position: absolute;
    top: 3;
    left: 5;
    font-size: 24;
`

const Text = styled.Text`
    font-size: 10;
    font-weight: bold;
    color: #555;
    position: absolute;
    bottom: 3;
    right: 3;
`