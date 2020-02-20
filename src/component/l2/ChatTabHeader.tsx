import React, { Component } from 'react';
import { Badge } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as BasicStyle from '../../lib/BasicStyle';

import ChatStore from '../../store/ChatStore';


@observer
export default class ChatTabHeader extends Component {
    private badge = () => {
        if (!ChatStore.unreadNumber) return null;
        return (
            <Badge>
                <BadgeText>{ChatStore.unreadNumber.toString()}</BadgeText>
            </Badge>
        );
    }

    render() {
        return (
            <Root>
                <Title>チャット</Title>
                {this.badge()}
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

const BadgeText = styled.Text`
    font-size: 12px;
`
