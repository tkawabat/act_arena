import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as BasicStyle from '../../lib/BasicStyle';


@observer
export default class ChatTabHeader extends Component {
    render() {
        return (
            <Root>
                <Title>台本</Title>
            </Root>
        );
    }
}

const Root = styled.View`
    flex-direction: row;
    align-items: center;
`

const Title = styled.Text`
    color: #FFF;
    font-weight: 500;
`