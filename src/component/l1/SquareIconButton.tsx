import React, { Component } from 'react';
import { Icon } from 'native-base';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    icon: string,
    disabled?: boolean,
    onPress: () => void,
}

export default class SquareIconButton extends Component<props> {

    render() {
        return (
            <Root onPress={this.props.onPress} disabled={this.props.disabled}>
                <_Icon name={this.props.icon} type='FontAwesome5' />
            </Root>
        );

    }
}

const Root = styled.TouchableOpacity`
    ${BasicStyle.squareButton};
    ${BasicStyle.center};
    ${p => p.disabled && BasicStyle.disabledButton};
`

const _Icon = styled(Icon)`
    
`