import React, { Component } from 'react';
import { Text, Item, Input } from 'native-base';
import styled from 'styled-components/native';

import * as C from '../../src/lib/Const';
import * as BasicStyle from '../../src/lib/BasicStyle';


interface props {
    name: string,
    onChange: (value) => void,
}

export default class IntSelector extends Component<props> {

    render() {
        return (
            <Item>
                <Text>{this.props.name}:</Text>
                <Input
                    onChangeText={this.props.onChange}
                />
            </Item>

        )
    }
}