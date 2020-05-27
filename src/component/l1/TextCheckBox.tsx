import React, {Component} from 'react';
import { CheckBox } from 'native-base';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    text: string
    onoff: boolean
    onPress: () => void
}

export default class MatchingButton extends Component<props> {

    render() {
        return (
            <Root>
                <_CheckBox checked={this.props.onoff} onPress={this.props.onPress}/><PlaceText>{this.props.text}</PlaceText>
            </Root>
        );
    }
}

const Root = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const _CheckBox = styled(CheckBox)`
    margin-right: 13px;
`;

const PlaceText = styled.Text`
    margin-right: 3px;
`;