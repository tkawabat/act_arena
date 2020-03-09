import React, {Component} from 'react';
import { Alert } from 'react-native';
import { Card, Badge } from "native-base";
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';


import MatchingStore from '../../store/MatchingStore';

interface props {
}

@observer
export default class LobbyCardMatching extends Component<props> {
    private onPress = () => {
        MatchingStore.toggle();
    }
    
    render() {
        let animation = null;
            if (MatchingStore.isMatching) {
                animation = (
                <Animatable.View animation={'jello'} duration={4000} iterationCount={'infinite'}>
                    <Badge {...badgeColor}>
                        <BadgeText>マッチング中</BadgeText>
                    </Badge>
                </Animatable.View>
                );
            } else {
                animation = (
                <Animatable.View animation={'fadeIn'} easing={'ease-in-out'} duration={4000} iterationCount={'infinite'}>
                        <PressText>タップしてマッチング</PressText>
                </Animatable.View>
                );
            }

        return (
            <Touch onPress={this.onPress}>
                <Root>
                    <Main>
                        <CardTitle>
                            <TitleText>サシ劇マッチング</TitleText>
                        </CardTitle>
                        <ExplainRoot>
                            <ExplainText>読み時間合わせて60分。サクッと１本劇しよう！</ExplainText>
                        </ExplainRoot>
                    </Main>
                    <Right>
                        {animation}
                    </Right>
                </Root>
            </Touch>
        );
    }
}


const Root = styled(Card)`
    min-height: 100px;
    margin: 10px;
    padding: 10px;    
    color: #000;
`;

const Touch = styled.TouchableOpacity`
`;

const Main = styled.View`
`;

const Right = styled.View`
    flex: 1;
    align-self: flex-end;
    justify-content: flex-end;
`;

const CardTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const TitleText = styled.Text`
    font-size: 24px;
    font-weight: 600;
    color: #000044;
`;

const BadgeText = styled.Text`
    color: #fff;
    font-size: 12px;
    font-weight: 500;
`

const PressText = styled.Text`
    color: gray;
    font-size: 12px;
    font-weight: 500;
`

const ExplainRoot = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ExplainText = styled.Text`
    margin-top: 10px;
    margin-left: 15px;
    font-size: 16px;
`;

const badgeColor = {
    true: {'success':true},
    false: {'warning':true},
}