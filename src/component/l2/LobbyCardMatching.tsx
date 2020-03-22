import React, {Component} from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import MatchingStore from '../../store/MatchingStore';

import TextBadge from '../l1/TextBadge';
import LobbyCardBase from '../l1/LobbyCardBase';

interface props {
}

@observer
export default class LobbyCardMatching extends Component<props> {
    
    render() {
        let animation = null;
            if (MatchingStore.isMatching) {
                animation = (
                <Animation animation={'jello'} duration={4000} iterationCount={'infinite'}>
                    <TextBadge text={'マッチング中'} />
                </Animation>
                );
            } else {
                animation = (
                <Animation animation={'fadeIn'} easing={'ease-in-out'} duration={4000} iterationCount={'infinite'}>
                        <PressText>タップしてマッチング</PressText>
                </Animation>
                );
            }

        return (
            <LobbyCardBase
                title={'サシ劇マッチング'}
                onPress={MatchingStore.toggle.bind(this)}
            >
                <Body>
                    <ExplainText>サクッと１本劇しよう！ 読み時間合わせて60分。</ExplainText>
                </Body>
                <Footer>
                    {animation}
                </Footer>
            </LobbyCardBase>
        );
    }
}


const Body = styled.View`
    flex: 1;
    margin-top: 10px;
`;

const Footer = styled.View`
    flex: 1;
    margin-top: auto;
`;

const ExplainText = styled.Text`
    margin-left: 15px;
`;

const Animation = styled(Animatable.View)`
    margin-left: auto;
`

const PressText = styled.Text`
    color: gray;
    font-size: 12px;
    font-weight: 500;
`
