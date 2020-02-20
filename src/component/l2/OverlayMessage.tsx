import React, {Component} from 'react';
import { Dimensions } from 'react-native';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import * as BasicStyle from '../../lib/BasicStyle';

import OverlayMessageStore from '../../store/OverlayMessageStore';

@observer
export default class OverlayMessage extends Component {
    render() {
        return (
            <Root
                animation={{
                    from: {translateX: OverlayMessageStore.from}
                    , to: {translateX: OverlayMessageStore.to}
                }}
                duration={OverlayMessageStore.duration}
                onAnimationEnd={OverlayMessageStore.animationEnd}
            >
                {OverlayMessageStore.message}
            </Root>
        );
    }
}

const {height, width} = Dimensions.get('window');

const Root = styled(Animatable.Text)`
    top: ${height / 2 - 150}px;
    right: ${width}px;
    width: ${width}px;
    background-color: rgba(255,255,255,0.8);
    position: absolute;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    color: #FF9900;
`