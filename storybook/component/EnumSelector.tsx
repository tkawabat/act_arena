import React, { Component } from 'react';
import { Text, Item, Picker, Input } from 'native-base';
import styled from 'styled-components/native';

import * as C from '../../src/lib/Const';
import * as EnumUtil from '../../src/lib/EnumUtil';
import * as BasicStyle from '../../src/lib/BasicStyle';


interface props {
    name: string,
    myEnum,
    onChange: (value) => void,
    selectedValue,
}

export default class EnumSelector extends Component<props> {

    render() {
        const pickerItem = [];
        for (const key of EnumUtil.getKeys(this.props.myEnum)) {
            pickerItem.push(
                <Picker.Item label={key} value={this.props.myEnum[key]} />
            );
        }

        return (
            <Item>
                <Text>{this.props.name}:</Text>
                <Picker
                    mode='dropdown'
                    onValueChange={this.props.onChange}
                    selectedValue={this.props.selectedValue}
                >
                    {pickerItem}
                </Picker>
            </Item>

        )
    }
}