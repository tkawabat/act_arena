import React, {Component} from 'react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


interface props {
    text: string;
}

export default class LobbyNotice extends Component<props> {
    
    render() {
        const text = this.props.text.replace(/¥n/g, '\n');
        return (
            <Root>
                <TitleText>{text}</TitleText>
            </Root>
        );
    }
}


const Root = styled.View`
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
    padding: 10px;
    border-radius: 5px;
    background-color: ${BasicStyle.colorWarning};
    opacity: 0.5;
`;

const TitleText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${BasicStyle.colorDeep};
`;