
import React, { Component } from 'react';
import { Container, Header, Content, Icon, Button } from 'native-base';
import { observer } from 'mobx-react';

import * as C from '../lib/Const';
import SkywayStore from '../store/SkywayStore';


@observer
export default class IconExample extends Component {

    render() {

        const name:string = SkywayStore.speakState == C.SpeakState.SPEAK ? 'microphone': 'microphone-slash';
        const disabled:boolean = SkywayStore.speakState == C.SpeakState.DISABLED;
        
        return (
            <Button onPress={SkywayStore.toggleMicrophone} disabled={disabled}>
                <Icon name={name} type='FontAwesome5' />
            </Button>
        );

    }
}