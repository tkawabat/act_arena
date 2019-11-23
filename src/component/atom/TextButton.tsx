import React, { Component } from 'react';
import { View, Icon, Button } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    text: string,
}

export default class TextButton extends Component<props> {

    render() {
        return (
            <Root>
                <Text>{this.props.text}</Text>
            </Root>
        );

    }
}

const Root = styled.TouchableOpacity`
    ${BasicStyle.buttonBase};
    ${BasicStyle.center};
    border-width: 1;
`

const Text = styled.Text`
    font-size: 18;
    font-weight: bold;
`