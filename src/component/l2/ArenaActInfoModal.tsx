import React, {Component} from 'react';
import { Text, View, } from 'native-base';
import Modal from 'react-native-modal';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import ArenaStore from '../../store/ArenaStore';
import ArenaScenarioStore from '../../store/ArenaScenarioStore';

import UserIcon from '../l1/UserIcon';


interface props {

}

@observer
export default class ArenaActInfoModal extends Component<props> {

    private getCharactersText = () => {
        let result = [];
        let i = 0;
        for (const character of ArenaScenarioStore.characters) {
            result.push(<Text key={'charactor'+i}>{character.name+': '+character.userName}</Text>)
            i++;
        }
        return result;
    }

    private hide = () => {
        ArenaStore.setModal(false);
    }

    render() {
        // const user: User = {
        //     id: 'a'
        //     , name: 'b'
        //     , gender: C.Gender.Female
        //     , iconUrl: 'https://facebook.github.io/react-native/img/header_logo.png'
        // };

        return (
            <Modal
                isVisible={ArenaStore.modal}
                onBackdropPress={this.hide}
                backdropOpacity={0.4}
                animationIn='slideInRight'
                animationOut='slideOutLeft'
            >
                <Root>
                    <Title>{ArenaScenarioStore.title}</Title>
                    {/* <UserIcon size={C.UserIconSize.S} user={user} /> */}
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