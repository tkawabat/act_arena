import React, {Component} from 'react';
import { Text, View, } from 'native-base';
import Modal from 'react-native-modal';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import TheaterStore from '../../store/TheaterStore';


interface props {

}

@observer
export default class TheaterActInfoModal extends Component<props> {

    private getCharactersText = () => {
        let result = [];
        let i = 0;
        for (const character of TheaterStore.characters) {
            result.push(<Text key={'charactor'+i}>{character.name+': '+character.userName}</Text>)
            i++;
        }
        return result;
    }

    private hide = () => {
        TheaterStore.setModal(false);
    }

    render() {

        return (
            <Modal
                isVisible={TheaterStore.modal}
                onBackdropPress={this.hide}
                backdropOpacity={0.4}
                animationIn='slideInRight'
                animationOut='slideOutLeft'
            >
                <Root>
                    <Title>『{TheaterStore.title}』</Title>
                    <Author>作: {TheaterStore.author}</Author>
                    {this.getCharactersText()}
                </Root>
            </Modal>
        );
    }
}

const Root = styled(View)`
    text-align: center;
    background-color: #FFF;
    padding: 15px;
    border-color: #444;
    border-width: 2px;
    border-radius: 5px;
`

const Title = styled.Text`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
`

const Author = styled.Text`
    margin-bottom: 10px;
    font-size: 14px;
`