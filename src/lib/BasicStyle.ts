import { css } from 'styled-components';
import { Dimensions } from 'react-native';

let { height, width } = Dimensions.get('window');
export const screenWidth = css`
    width: ${width};
`

export const center = css`
    justify-content: center;
    align-items: center;
`

export const squareButtonBase = css`
    width: 50;
    height: 50;
    border-width: 1;
    box-shadow: 1px 1px 5px #c3e1ff;
    border-radius: 5;
    background-color: #FFF;
`