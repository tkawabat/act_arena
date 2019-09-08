import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Button } from 'native-base';
import Modal from 'react-native-modal';
import { observer } from 'mobx-react';

import * as C from '../lib/Const';
import UserStore, {User} from '../store/UserStore';
import ArenaStore from '../store/ArenaStore';

import UserIcon from './UserIcon';


@observer
export default class ActInfo extends Component {

    private getCharactersText = () => {
        let result = [];
        for (const character of ArenaStore.characters) {
            result.push(<Text>{character.name+': '+character.userName}</Text>)
        }
        return result;
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
                style={styles.body}
                isVisible={ArenaStore.modal}
                onBackdropPress={() => ArenaStore.setModal(false)}
                backdropOpacity={0.4}
                animationIn='slideInRight'
                animationOut='slideOutLeft'
            >
                <View style={styles.modal}>
                    <Text style={styles.title}>{ArenaStore.title}</Text>
                    {/* <UserIcon size={C.UserIconSize.S} user={user} /> */}
                    {this.getCharactersText()}
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        textAlign: 'center',
        marginHorizontal: 10,
    },
    modal: {
        backgroundColor: '#FFF',
        padding: 20,
        borderColor: '#444',
        borderWidth: 2,
        borderRadius: 5,
    },
    title: {
        marginBottom: 10,
        fontWeight: '400',
    },
    characters: {

    },
});