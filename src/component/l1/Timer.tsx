import React, { Component } from 'react';
import { Icon } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';


interface props {
    time: number
}

@observer
export default class Timer extends Component<props> {
    render() {
        const time = this.props.time > 0 ? this.props.time.toString() : '---';
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
    height: 20px;
    border-color: #555;
    text-align: center;
    justify-content: flex-start;
    margin-left: 5px;
`

const TimerIcon = styled(Icon)`
    align-self: center;
    font-size: 16px;
    color: black;
`

const TimerText = styled.Text`
    align-self: center;
    font-size: 16px;
    font-weight: 800;
    margin-left: 3px;
`