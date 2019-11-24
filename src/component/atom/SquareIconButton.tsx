import React, { Component } from 'react';
import { View, Icon, Button } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    icon: string,
    onPress: () => void,
}

export default class SquareIconButton extends Component<props> {

    render() {
        return (
            <Root onPress={this.props.onPress}>
                <_Icon name={this.props.icon} type='FontAwesome5' />
            </Root>
        );

    }
}

const Root = styled.TouchableOpacity`
    ${BasicStyle.squareButtonBase};
    ${BasicStyle.center};
`

const _Icon = styled(Icon)`
    
`