import React from 'react';
import { View } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';

import * as C from './Const';
import * as BasicStyle from './BasicStyle';


export const CenteredView = (children) => {
    return (<Root>{children}</Root>);
}


const Root = styled(View)`
    flex: 1;
    ${BasicStyle.screenWidth};
    ${BasicStyle.center};
    background-color: #F5FCFF;
`