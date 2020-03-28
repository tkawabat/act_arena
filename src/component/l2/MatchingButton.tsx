import React, {Component} from 'react';
import { Button } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import MatchingStore from '../../store/MatchingStore';
import LobbyStore from '../../store/LobbyStore';


interface props {
}

@observer
export default class TestTellButton extends Component<props> {

    render() {
        const animation = MatchingStore.isMatching ? 'flash' : '';
        const text = MatchingStore.isMatching ? 'マッチング中' : 'エントリー';
        const color = MatchingStore.isMatching ? {danger:true} : {success:true};
        return (
            <Animatable.View animation={animation} duration={4000} iterationCount={'infinite'}>
                <ButtonEntried onPress={MatchingStore.toggle.bind(this)} {...color} {...this.props}>
                    <ButtonText>{text}</ButtonText>
                </ButtonEntried>
            </Animatable.View>
        );
    }
}

const ButtonEntried = styled(Button)`
    width: 100px;
    height: 40px;
    ${BasicStyle.center};
`

const ButtonText = styled.Text`
    color: #fff;
    font-size: 14px;
    font-weight: 500;
`