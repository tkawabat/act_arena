import React, { Component } from 'react';
import { Icon, } from 'native-base';
import Tooltip from 'react-native-walkthrough-tooltip';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    text: string,
}

@observer
export default class Tips extends Component<props> {
    state = {
        visible: false
    }

    render() {
        return (
            <Tooltip
                isVisible={this.state.visible}
                content={<PopupText>{this.props.text}</PopupText>}
                placement="center"
                arrowSize={{width: 30, height: 40}}
            >
                <Root
                    onPressIn={() => this.setState({ visible: true })}
                    onPressOut={() => this.setState({ visible: false })}
                    {...this.props}
                >
                    <_Icon name='question' type='FontAwesome5' />
                </Root>
            </Tooltip>
        );
    }
}


const Root = styled.TouchableOpacity`
    ${BasicStyle.center};
    width: 24px;
    height: 24px;
    border-width: 1px;
    border-color: #aaa;
    border-radius: 50;
    padding: 5px;
`;

const PopupText = styled.Text`
    font-size: 12px;
    line-height: 16px;
`;

const _Icon = styled(Icon)`
    font-size: 12px;
    color: #333;
`;