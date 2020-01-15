import React, { Component } from 'react';
import { Button } from 'native-base';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import SkywayStore from '../../store/SkywayStore';
import UserStore from '../../store/UserStore';

@observer
export default class TestTellButton extends Component {

    private testTell = () => {
        SkywayStore.testTell(UserStore.id);
    }

    render() {

        return (
            <ButtonEntried warning onPress={this.testTell}>
                <ButtonText>{'通話テスト'}</ButtonText>
            </ButtonEntried>
        );
    }
}

const ButtonEntried = styled(Button)`
    width: 100;
    height: 40;
    ${BasicStyle.center};
`

const ButtonText = styled.Text`
    color: #fff;
    font-size: 14;
    font-weight: 500;
`