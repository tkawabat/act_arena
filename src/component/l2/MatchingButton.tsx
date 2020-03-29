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
        const disabled = LobbyStore.actTheaterId !== undefined;
        const isMatching = MatchingStore.isMatching && !disabled;
        const animation = isMatching ? 'flash' : '';
        const text = isMatching ? 'マッチング中' : 'エントリー';
        const color = isMatching ? {danger:true} : {success:true};
        return (
            <Animatable.View animation={animation} duration={4000} iterationCount={'infinite'}>
                <EntryButton {...color} disabled={disabled} onPress={MatchingStore.toggle.bind(this)} {...this.props}>
                    <ButtonText>{text}</ButtonText>
                </EntryButton>
            </Animatable.View>
        );
    }
}

const EntryButton = styled(Button)`
    width: 100px;
    height: 40px;
    ${BasicStyle.center};
`

const ButtonText = styled.Text`
    color: #fff;
    font-size: 14px;
    font-weight: 500;
`