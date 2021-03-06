import React, { Component } from 'react';
import { Button } from 'native-base';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import ArenaStore from '../../store/ArenaStore';
import ArenaUserStore from '../../store/ArenaUserStore';

@observer
export default class EntryButton extends Component {

    render() {
        const text = ArenaUserStore.userState === C.ArenaUserState.LISTNER ? 'エントリー' : 'エントリー中';
        const success = ArenaUserStore.userState === C.ArenaUserState.LISTNER;
        const onPress = ArenaUserStore.userState === C.ArenaUserState.LISTNER ?
            () => ArenaStore.entry(C.ArenaUserState.ENTRY)
            : () => ArenaStore.entry(C.ArenaUserState.LISTNER);

        return (
            <ButtonEntried success={success} onPress={onPress}>
                <ButtonText>{text}</ButtonText>
            </ButtonEntried>
        );
    }
}

const ButtonEntried = styled(Button)`
    width: 100px;
    height: 40px;
    ${BasicStyle.center};
    ${p => p.success ? '' : 'background-color: #ccc'};
`

const ButtonText = styled.Text`
    color: #fff;
    font-size: 14px;
    font-weight: 500;
`