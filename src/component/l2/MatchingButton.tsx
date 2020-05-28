import Moment from 'moment';
import React, {Component, useState} from 'react';
import { Button, CheckBox } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import MatchingStore from '../../store/MatchingStore';
import LobbyStore from '../../store/LobbyStore';

import TextCheckBox from '../l1/TextCheckBox';
import RectangleTextButton from '../l1/RectangleTextButton';


interface props {
}

@observer
export default class MatchingButton extends Component<props> {

    render() {
        const disabled = LobbyStore.actTheaterId !== undefined;
        const isMatching = MatchingStore.isMatching && !disabled;

        const limit = MatchingStore.limit ? MatchingStore.limit.format('HH:mm') : '';
        const animation = isMatching ? 'flash' : '';
        const text = isMatching ? 'マッチング中\n~'+limit : 'エントリー';
        const color = isMatching ? {danger:true} : {success:true};

        return (
            <Root>
                <DateTimePickerModal
                    isVisible={MatchingStore.showStartDatePicker}
                    date={MatchingStore.startAt.toDate()}
                    mode={"datetime"}
                    onConfirm={(date) => {
                        MatchingStore.startAt = Moment(date);
                        MatchingStore.showStartDatePicker = false;
                    }}
                    onCancel={() => {
                        MatchingStore.showStartDatePicker = false;
                    }}
                />
                <DateTimePickerModal
                    isVisible={MatchingStore.showEndDatePicker}
                    date={MatchingStore.endAt.toDate()}
                    mode={"datetime"}
                    onConfirm={(date) => {
                        MatchingStore.endAt = Moment(date);
                        MatchingStore.showEndDatePicker = false;
                    }}
                    onCancel={() => {
                        MatchingStore.showEndDatePicker = false;
                    }}
                />
                <Row>
                    <Label>開始：</Label>
                    <DateButton
                        text={MatchingStore.startAt.format('MM/DD HH:mm')}
                        onPress={() => MatchingStore.showStartDatePicker = !MatchingStore.showStartDatePicker}
                    />
                    <Text>〜</Text>
                    <DateButton
                        text={MatchingStore.endAt.format('MM/DD HH:mm')}
                        onPress={() => MatchingStore.showEndDatePicker = !MatchingStore.showEndDatePicker}
                    />                
                </Row>
                <Row>
                    <Label>場所：</Label>
                    <TextCheckBox text={'アクトアリーナ'} onoff={MatchingStore.actArena} onPress={MatchingStore.toggleActArena} />
                    <TextCheckBox text={'Discord'} onoff={MatchingStore.discord} onPress={MatchingStore.toggleDiscord} />
                </Row>
                <Row>
                    <Label>人数：</Label>
                    <TextCheckBox text={'2人'} onoff={MatchingStore.pair} onPress={MatchingStore.togglePair} />
                    <TextCheckBox text={'3~5人'} onoff={MatchingStore.smallNumber} onPress={MatchingStore.toggleSmallNumber} />
                </Row>
                <Row>
                    <Label>時間：</Label>
                    <TextCheckBox text={'~30分'} onoff={MatchingStore.half} onPress={MatchingStore.toggleHalf} />
                    <TextCheckBox text={'~1時間'} onoff={MatchingStore.one} onPress={MatchingStore.toggleOne} />
                    <TextCheckBox text={'~1.5時間'} onoff={MatchingStore.oneHalf} onPress={MatchingStore.toggleOneHalf} />
                    <TextCheckBox text={'~2時間'} onoff={MatchingStore.two} onPress={MatchingStore.toggleTwo} />
                </Row>
                <Animatable.View animation={animation} duration={6000} iterationCount={'infinite'}>
                    <EntryButton {...color} disabled={disabled} onPress={MatchingStore.toggle.bind(this)} {...this.props}>
                        <ButtonText>{text}</ButtonText>
                    </EntryButton>
                </Animatable.View>
            </Root>
        );
    }
}

const Root = styled.View`
    border: 3px;
    border-radius: 10px;
    border-color: #999;
    margin: 10px;
    padding: 10px;
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
`;

const Label = styled.Text`
    font-size: 16px;
    margin-right: -5px;
`;

const Text = styled.Text`
    font-size: 16px;
`;

const DateButton = styled(RectangleTextButton)`
    height: 24px;
    width: 100px;
    margin-left: 10px;
    margin-right: 10px;
`;

const EntryButton = styled(Button)`
    width: 120px;
    height: 50px;
    ${BasicStyle.center};
`

const ButtonText = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
`