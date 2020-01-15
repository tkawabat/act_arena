import React, { Component } from 'react';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaStore from '../../store/ArenaStore';
import ArenaUserStore from '../../store/ArenaUserStore';
import ConfigStore from '../../store/ConfigStore';


@observer
export default class ArenaAddTimeButton extends Component {

    private addActTime = () => {
        ConfigStore.load(true);
        ArenaStore.asyncAddActTime().then(() => {
            ConfigStore.load(false);
        })
    }

    render() {
        const disabled = ArenaUserStore.userState !== C.ArenaUserState.ACTOR
            || !ArenaStore.addTimeCount || ArenaStore.addTimeCount <= 0;
        const count = disabled ? 0 : ArenaStore.addTimeCount;

        return (
            <Root onPress={this.addActTime} disabled={disabled}>
                <Text>+30秒</Text>
                <Remind>あと{count}回</Remind>

            </Root>
        );

    }
}

const Root = styled.TouchableOpacity`
    ${BasicStyle.squareButton};
    ${p => p.disabled && BasicStyle.disabledButton};
`

const Text = styled.Text`
    font-size: 12;
    font-weight: bold;
    color: #555;
    margin-top: 5px;
`

const Remind = styled.Text`
    font-size: 8;
    font-weight: bold;
    color: #555;
    position: absolute;
    bottom: 3;
    right: 3;
`