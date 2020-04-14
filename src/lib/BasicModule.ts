import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import * as BasicStyle from './BasicStyle';


export const ScreenRoot = styled.View`
    flex: 1;
    margin-top: ${getStatusBarHeight()}px;
    margin-bottom: ${getBottomSpace()}px;
`

export const Header = styled.View`
    ${BasicStyle.screenWidth};
    height: 50px;
    padding-top: 0px;
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #999;
`;

export const HeaderTitle = styled.Text`
    color: #333;
    margin-left: 3px;
    font-size: 18px;
    font-weight: 600;
`;

export const Left = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: 10px;
`;

export const ColumnLeft = styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    padding-left: 10px;
`;

export const Center = styled.View`
    flex: 2;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Right = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
`;