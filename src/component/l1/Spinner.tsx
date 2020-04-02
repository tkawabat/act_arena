import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import Spinner_ from 'react-native-loading-spinner-overlay';

import ConfigStore from '../../store/ConfigStore';


interface props {

}

@observer
export default class Spinner extends Component<props> {
    render() {
        return (
            <Spinner_ visible={ConfigStore.isLoad} />
        );
    }
}