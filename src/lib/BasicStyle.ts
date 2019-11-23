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

export const buttonBase = css`
    width: 60;
    height: 60;
    box-shadow: 1px 1px 5px #c3e1ff;
    border-radius: 5;
`