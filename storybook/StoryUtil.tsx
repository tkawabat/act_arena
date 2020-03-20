import React from 'react';
import { View } from 'native-base';
//import * as Font from 'expo-font';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import styled from 'styled-components/native';
import Moment from 'moment';

import * as C from '../src/lib/Const';
import * as BasicStyle from '../src/lib/BasicStyle';

import UserStore from '../src/store/UserStore';
import SkywayStore from '../src/store/SkywayStore';
import ArenaStore from '../src/store/ArenaStore';
import ArenaUserStore, {ArenaUser} from '../src/store/ArenaUserStore';
import ArenaScenarioStore from '../src/store/ArenaScenarioStore';

export const init = () => {

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
        const userId = (user as FirebaseAuthTypes.UserCredential).user.uid;
        UserStore.id = userId;
        //SkywayStore.connect(userId);
        SkywayStore.connect(userId + Moment().unix().toString());
        ArenaUserStore.users = {[userId]: {
            name: 'hoge',
            gender: C.Gender.Male,
            iconUrl: null,
            state: C.ArenaUserState.LISTNER,
        } as ArenaUser}
        console.log('ArenaUserStore.users:', ArenaUserStore.users);
    });


    // ArenaScenarioStore.scenarioUrl = 'http://doodletxt.web.fc2.com/para6v3.html';
    // ArenaScenarioStore.agreementUrl = 'http://doodletxt.web.fc2.com/';
    // ArenaScenarioStore.startText = '田中：……雨が止んだら。';
    // ArenaScenarioStore.endText = 'Ｎ：男は漆黒に染まった瞳で少女を捉えながら、ゆっくりと歩みを進める。';
    // ArenaScenarioStore.title = 'パラノーマンズ・ブギー⑥『大馬鹿者　前編』';
    // const character1 = {
    //     name: '妖紅',
    //     gender: C.Gender.Female,
    //     user: '1',
    //     userName: 'はなこ'
    // };
    // const character2 = {
    //     name: '田中＆N',
    //     gender: C.Gender.Male,
    //     user: '2',
    //     userName: 'たろう'
    // };

    ArenaStore.id = 555555;
    ArenaStore.time = 10;

    ArenaScenarioStore.scenarioUrl = 'http://doodletxt.web.fc2.com/hgw.html';
    ArenaScenarioStore.agreementUrl = 'http://doodletxt.web.fc2.com/';
    ArenaScenarioStore.startText = '堂島：親臣、お前さ。';
    ArenaScenarioStore.endText = '　　　今は、いつだ？';
    ArenaScenarioStore.title = 'ハローグッドワールド';
    const character1 = {
        name: '蝶野',
        gender: C.Gender.Male,
        user: '1',
        userName: 'aaaa'
    };
    const character2 = {
        name: '堂島',
        gender: C.Gender.Male,
        user: '2',
        userName: 'たろう'
    };


    ArenaScenarioStore.characters = [
        character1,
        character2,
    ];

    // for scenario test
    ArenaStore.arenaState = C.ArenaState.CHECK;
    // ArenaScenarioStore.agreementState = C.AgreementState.AGREE;
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