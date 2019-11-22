import React, { Component } from 'react';
import { Icon, Button } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { css } from 'styled-components';

import * as C from '../lib/Const';
import * as BasicStyle from '../lib/BasicStyle';

import SkywayStore from '../store/SkywayStore';


interface props {
    speak: C.SpeakState
}

@observer
export default class Microphone extends Component<props> {

    render() {
        const name:string = this.props.speak === C.SpeakState.SPEAK ? 'microphone': 'microphone-slash';
        const disabled:boolean = this.props.speak === C.SpeakState.DISABLED;
        
        return (
            <MicrophneButton onPress={SkywayStore.toggleMicrophone} disabled={disabled}>
                <Icon name={name} type='FontAwesome5' />
            </MicrophneButton>
        );

    }
}

const MicrophneButton = styled(Button)`
    width: 100;
    height: 40;
    ${BasicStyle.center};
`