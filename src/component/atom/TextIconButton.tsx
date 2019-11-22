import React, { Component } from 'react';
import { View, Icon, Button, Text } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    icon: string,
    text: string,
}

export default class TextIconButton extends Component<props> {

    render() {
        return (
            <Root>
                <Icon name={this.props.icon} type='FontAwesome5' />
                <Text>{this.props.text}</Text>
            </Root>
        );

    }
}

const Root = styled(View)`
    width: 60;
    height: 60;
    border: 1;
`