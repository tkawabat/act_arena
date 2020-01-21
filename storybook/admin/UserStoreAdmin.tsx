import React, { Component } from 'react';
import { View, Text, Item, Picker, Input } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { observer } from 'mobx-react';

import * as C from '../../src/lib/Const';
import * as BasicStyle from '../../src/lib/BasicStyle';

import UserStore from '../../src/store/UserStore';
import EnumSelector from '../component/EnumSelector';


@observer
export default class UserStoreAdmin extends Component {

    render() {
        return (
            <Root>
            </Root>
        )
    }
}

const Root = styled.View`
    ${BasicStyle.screenWidth};
`