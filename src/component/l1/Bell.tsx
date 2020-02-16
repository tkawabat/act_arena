import React, { Component } from 'react';
import { Icon } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import PushStore from '../../store/PushStore';


interface props {
    onPress: () => void,
}

@observer
export default class Bell extends Component<props> {
    render() {
        const name = PushStore.onoff ? 'bell' : 'bell-slash';
        return (
            <BellIcon name={name} type='FontAwesome5' onPress={this.props.onPress} />
        );
    }
}

const BellIcon = styled(Icon)`
    font-size: 24px;
    margin-left: 10px;
    color: black;
`