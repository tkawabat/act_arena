import React from 'react';
import { Dimensions } from 'react-native';
import { View } from 'native-base';
import styled from 'styled-components/native';
import { css } from 'styled-components';

import * as BasicStyle from './BasicStyle';


export const CenteredView = (children) => <Root>{children}</Root>;

let {height, width} = Dimensions.get('window');
const Root = styled(View)`
    flex: 1;
    width: ${width};
    ${BasicStyle.center};
    backgroundColor: #F5FCFF;
`