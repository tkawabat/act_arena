import React, { Component } from 'react';
import { CheckBox } from 'native-base';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    checked: boolean,
    text: string,
    onPress: () => void,
    disabled?: boolean,
}

export default class _CheckBox extends Component<props> {

    render() {
        return (
            <Root>
                <Box disabled={this.props.disabled} checked={this.props.checked} color={'green'} {...this.props} />
                <Text>{this.props.text}</Text>
            </Root>
        );

    }
}

const Root = styled.View`
    flex-direction: row;
    margin-vertical: 7px;
`

const Box = styled(CheckBox)`
    margin-right: 15px;
    ${BasicStyle.disabled}
`

const Text = styled.Text`
    font-weight: 500;
    font-size: 14px;
`