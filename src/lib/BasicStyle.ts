import { css } from 'styled-components';
import { Dimensions } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';


let { height, width } = Dimensions.get('window');

export const bottom = height - getStatusBarHeight() - getBottomSpace();

export const screenWidth = css`
    width: ${width}px;
`

export const center = css`
    justify-content: center;
    align-items: center;
`

export const button = css`
    border: 1px solid;
    box-shadow: 1px 1px 3px #c3e1ff;
    border-radius: 5px;
    background-color: #fff;
`

export const rectangleButton = css`
    ${button}
    width: 80px;
    height: 40px;
`

export const squareButton = css`
    ${button}
    width: 40px;
    height: 40px;
`

export const disabledButton = css`
    background-color: #999;
    border: 1px solid #999;
    box-shadow: none;
`

export const disabled = props => {
    if (props.disabled) {
        return `background-color: #999;`;
    }
}

export const disabledColor = props => {
    if (props.disabled) {
        return `color: #999;`;
    }
}

export const colorLight = `#447198`;
export const colorMiddle = `#182F6E`;
export const colorDeep = `#000044`;