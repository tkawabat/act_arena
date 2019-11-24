import React, { Component } from 'react';
import { View, Text, Item, Picker, Input } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { observer } from 'mobx-react';

import * as C from '../../src/lib/Const';
import * as EnumUtil from '../../src/lib/EnumUtil';
import * as BasicStyle from '../../src/lib/BasicStyle';

import ArenaStore from '../../src/store/ArenaStore';


interface props {
    name: string,
    myEnum,
    onValueChange: (value) => void,
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
                    onValueChange={this.props.onValueChange}
                    selectedValue={this.props.selectedValue}
                >
                    {pickerItem}
                </Picker>
            </Item>

        )
    }
}