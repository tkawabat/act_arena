import React, { Component } from 'react';
import { View, Icon, Button } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    text: string,
    onPress: () => void,
}

export default class SquareTextButton extends Component<props> {

    render() {
        return (
            <Root onPress={this.props.onPress}>
                <Text>{this.props.text}</Text>
            </Root>
        );

    }
}

const Root = styled.TouchableOpacity`
    ${BasicStyle.squareButtonBase};
    ${BasicStyle.center};
`

const Text = styled.Text`
    font-size: 16;
    font-weight: bold;
`