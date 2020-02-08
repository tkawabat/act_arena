import React, { Component } from 'react';
import { View, Icon, Button } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    icon: string,
    text: string,
    disabled?: boolean,
    onPress: () => void,
}

export default class SquareTextIconButton extends Component<props> {

    render() {
        return (
            <Root onPress={this.props.onPress} disabled={this.props.disabled}>
                <_Icon name={this.props.icon} type='FontAwesome5' />
                <Text>{this.props.text}</Text>
            </Root>
        );

    }
}

const Root = styled.TouchableOpacity`
    ${BasicStyle.squareButton};
    ${p => p.disabled && BasicStyle.disabledButton};
`

const _Icon = styled(Icon)`
    position: absolute;
    top: 3px;
    left: 5px;
    font-size: 20px;
`

const Text = styled.Text`
    font-size: 8px;
    font-weight: bold;
    color: #555;
    position: absolute;
    bottom: 3px;
    right: 3px;
`