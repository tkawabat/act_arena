import React, { Component } from 'react';
import { Button } from 'native-base';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import SkywayStore from '../../store/SkywayStore';
import UserStore from '../../store/UserStore';


interface props {
}

@observer
export default class TestTellButton extends Component<props> {

    render() {
        return (
            <_Button warning {...this.props} onPress={SkywayStore.asyncTestTell.bind(this, UserStore.id)} >
                <ButtonText>{'通話テスト'}</ButtonText>
            </_Button>
        );
    }
}

const _Button = styled(Button)`
    width: 100px;
    height: 40px;
    ${BasicStyle.center};
`

const ButtonText = styled.Text`
    color: #fff;
    font-size: 14px;
    font-weight: 500;
`