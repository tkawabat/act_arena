import React, { Component } from 'react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    text: string,
    disabled?: boolean,
    onPress: () => void,
}

export default class SquareTextButton extends Component<props> {

    render() {
        return (
            <Root onPress={this.props.onPress} disabled={this.props.disabled} {...this.props}>
                <Text>{this.props.text}</Text>
            </Root>
        );

    }
}

const Root = styled.TouchableOpacity`
    ${BasicStyle.squareButton};
    ${BasicStyle.center};
    ${p => p.disabled && BasicStyle.disabledButton};
`

const Text = styled.Text`
    font-size: 12;
    font-weight: bold;
`