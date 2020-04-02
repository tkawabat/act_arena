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
        const result = [];

        result.push(<Middle key={'charactors'}>■CAST</Middle>)

        let i = 0;
        for (const character of TheaterStore.characters) {
            result.push(<Middle key={'charactor'+i}>{character.name+': '+character.userName}</Middle>)
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
                    <Section>
                        <Small>作: {TheaterStore.author}</Small>
                        <Small>上演時間: 約{TheaterStore.minutes}分</Small>
                    </Section>
                    <Section>
                        {this.getCharactersText()}
                    </Section>
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
    font-size: 18px;
    font-weight: 500;
`

const Section = styled.View`
    margin-top: 10px;
`;

const Small = styled.Text`
    margin-bottom: 3px;
    font-size: 12px;
`;

const Middle = styled.Text`
    margin-top: 3px;
`;