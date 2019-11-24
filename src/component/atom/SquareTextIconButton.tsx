import React, { Component } from 'react';
import { View, Icon, Button } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    icon: string,
    text: string,
}

export default class SquareTextIconButton extends Component<props> {

    render() {
        return (
            <Root>
                <_Icon name={this.props.icon} type='FontAwesome5' />
                <Text>{this.props.text}</Text>
            </Root>
        );

    }
}
/* const Root = styled(Button)` */
const Root = styled.TouchableOpacity`
    ${BasicStyle.buttonBase};
    /* ${BasicStyle.center}; */
    border-width: 1;
    box-shadow: 1px 1px 5px #c3e1ff;
    border-radius: 5;
    /* border-bottom: 4px solid #d37800; */
`

const _Icon = styled(Icon)`
    position: absolute;
    top: 3;
    left: 3;
    font-size: 24;
`

const Text = styled.Text`
    font-size: 14;
    font-weight: bold;
    color: #555;
    position: absolute;
    bottom: 3;
    right: 3;
`