import { css } from 'styled-components';
import { Dimensions } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';


let { height, width } = Dimensions.get('window');
export const screenWidth = css`
    width: ${width};
`

export const center = css`
    justify-content: center;
    align-items: center;
`

export const screenRoot = css`
    flex: 1;
    margin-top: ${getStatusBarHeight()};
    margin-bottom: ${getBottomSpace()};
`

export const squareButton = css`
    width: 40;
    height: 40;
    border: 1px solid;
    box-shadow: 1px 1px 5px #c3e1ff;
    border-radius: 5;
    background-color: #fff;
`

export const disabledButton = css`
    background-color: #999;
    border: 1px solid #999;
    box-shadow: none;
`