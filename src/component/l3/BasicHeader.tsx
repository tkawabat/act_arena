import React, { Component } from 'react';
import { Button, Icon, } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';
import { Header, HeaderTitle, Left, Center, Right } from '../../lib/BasicModule';
import Navigator from '../../lib/Navigator';


interface props {
    title: string;
    back?: boolean;
}

@observer
export default class BasicHeader extends Component<props> {

    render() {
        const back = this.props.back ? (<Button transparent>
            <Icon name='arrow-back' onPress={Navigator.back} />
        </Button>) : null;

        return (
            <Header>
                <Left>
                    {back}           
                </Left>
                <Center>
                    <HeaderTitle>{this.props.title}</HeaderTitle>
                </Center>
                <Right />
            </Header>
        );
    }
}