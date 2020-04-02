import React, { Component } from 'react';
import { Icon, Button } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import SkywayStore from '../../store/SkywayStore';

import RectangleIconButton from '../l1/RectangleIconButton';


@observer
export default class Microphone extends Component {

    render() {
        const name:string = SkywayStore.speakState === C.SpeakState.SPEAK ? 'microphone': 'microphone-slash';
        const disabled:boolean = SkywayStore.speakState === C.SpeakState.DISABLED;
        
        return (
            <RectangleIconButton icon={name} onPress={SkywayStore.toggleMicrophone} disabled={disabled} />
        );

    }
}