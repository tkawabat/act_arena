import React, { Component } from 'react';
import { Icon } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import ArenaStore from '../../store/ArenaStore';


@observer
export default class Timer extends Component {
    render() {
        const time = ArenaStore.time > 0 ? ArenaStore.time.toString() : '---';
        return (
            <Root>
                <TimerIcon name='clock' type='FontAwesome5' />
                <TimerText>{time}</TimerText>
            </Root>
            
        );
    }
}

const Root = styled.View`
    flex-direction: row;
    height: 20;
    border-color: #555;
    text-align: center;
    justify-content: flex-start;
    margin-left: 5px;
`

const TimerIcon = styled(Icon)`
    align-self: center;
    font-size: 16;
    color: black;
`

const TimerText = styled.Text`
    align-self: center;
    font-size: 16;
    font-weight: 800;
    margin-left: 3;
`