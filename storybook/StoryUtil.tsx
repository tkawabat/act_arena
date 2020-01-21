import React from 'react';
import { View } from 'native-base';
//import * as Font from 'expo-font';
import styled from 'styled-components/native';
import Moment from 'moment';
import { css } from 'styled-components';

import * as C from '../src/lib/Const';
import Firebase from '../src/lib/Firebase';
import * as BasicStyle from '../src/lib/BasicStyle';

import ConfigStore from '../src/store/ConfigStore';
import UserStore from '../src/store/UserStore';
import SkywayStore from '../src/store/SkywayStore';
import ArenaStore from '../src/store/ArenaStore';

export const init = () => {
    // ConfigStore.setInitLoad('font');
    ConfigStore.setInitLoad('skyway');
    ConfigStore.setInitLoad('user');
    ConfigStore.setInitLoad('arena');
    ConfigStore.setInitLoadComplete('init');

    // Font.loadAsync({
    //     'Roboto': require('native-base/Fonts/Roboto.ttf'),
    //     'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    // }).then(() => {
    //     ConfigStore.setInitLoadComplete('font');
    // });

    UserStore.anonymousLogin().then((user) => {
        if (!user) {
            alert('ユーザー情報の取得に失敗しました。');
        }
        const userId = (user as Firebase.auth.UserCredential).user.uid;
        //SkywayStore.connect(userId);
        //SkywayStore.connect(userId + Moment().unix().toString());
    });
}

export const CenteredView = (children) => {
    return (<Centered>{children}</Centered>);
}

export const FullView = (children) => {
    return (<Full>{children}</Full>);
}

export const BottomView = (children) => {
    return (<Bottom>{children}</Bottom>);
}


const Centered = styled(View)`
    flex: 1;
    ${BasicStyle.screenWidth};
    ${BasicStyle.center};
    background-color: #F5FCFF;
`

const Full = styled(View)`
    flex: 1;
    margin-top: 20px;
    margin-bottom: 40px;
    border-width: 1px;
`

const Bottom = styled(View)`
    position: absolute;
    bottom: 0;
    margin-bottom: 40px;
    border-width: 1px;
`