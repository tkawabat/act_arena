import { css } from 'styled-components';
import { Dimensions } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';


let { height, width } = Dimensions.get('window');
export const screenWidth = css`
    width: ${width}px;
`

export const center = css`
    justify-content: center;
    align-items: center;
`

export const header = css`
    ${screenWidth};
    height: 50px;
    padding-top: 0px;
    flex-direction: row;
    align-items: center;
`;

export const screenRoot = css`
    flex: 1;
    margin-top: ${getStatusBarHeight()}px;
    margin-bottom: ${getBottomSpace()}px;
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

// Modules
export const Left = styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    padding-left: 10px;
`

export const Center = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const Right = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
`