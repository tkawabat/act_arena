import React, { Component } from 'react';
import { Badge } from 'native-base';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    text: string
}

export default class TextBadge extends Component<props> {

    render() {
        return (
            <Root {...this.props}>
                <BadgeText>{this.props.text}</BadgeText>
            </Root>
        );

    }
}

const Root = styled(Badge)`
    ${BasicStyle.center};
`;

const BadgeText = styled.Text`
    color: #fff;
    font-size: 12px;
    font-weight: 500;
`;