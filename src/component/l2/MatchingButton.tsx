import Moment from 'moment';
import React, {Component, } from 'react';
import { Button } from 'native-base';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as C from '../../lib/Const';
import * as BasicStyle from '../../lib/BasicStyle';

import MatchingStore from '../../store/MatchingStore';
import LobbyStore from '../../store/LobbyStore';

import CheckBox from '../l1/CheckBox';
import RectangleTextButton from '../l1/RectangleTextButton';


interface props {
}

@observer
export default class MatchingButton extends Component<props> {

    render() {
        const disabled = LobbyStore.actTheaterId !== undefined;
        const isMatching = MatchingStore.isMatching && !disabled;

        const text = isMatching ? 'マッチング中' : 'エントリー';
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
                        disabled={disabled || isMatching}
                    />
                    <Text>〜</Text>
                    <DateButton
                        text={MatchingStore.endAt.format('MM/DD HH:mm')}
                        onPress={() => MatchingStore.showEndDatePicker = !MatchingStore.showEndDatePicker}
                        disabled={disabled || isMatching}
                    />                
                </Row>
                <Row>
                    <Label>場所：</Label>
                    <CheckBox
                        text={'アクトアリーナ'}
                        checked={MatchingStore.actArena}
                        onPress={MatchingStore.toggleActArena}
                        disabled={disabled || isMatching}
                    />
                    <CheckBox
                        text={'Discord'}
                        checked={MatchingStore.discord}
                        onPress={MatchingStore.toggleDiscord}
                        disabled={disabled || isMatching}
                    />
                </Row>
                <Row>
                    <Label>人数：</Label>
                    <CheckBox
                        text={'2人'}
                        checked={MatchingStore.pair}
                        onPress={MatchingStore.togglePair}
                        disabled={disabled || isMatching}
                    />
                    <CheckBox
                        text={'3~5人'}
                        checked={MatchingStore.smallNumber}
                        onPress={MatchingStore.toggleSmallNumber}
                        disabled={disabled || isMatching}
                    />
                </Row>
                <Row>
                    <Label>時間：</Label>
                    <CheckBox
                        text={'~30分'}
                        checked={MatchingStore.half}
                        onPress={MatchingStore.toggleHalf}
                        disabled={disabled || isMatching}
                    />
                    <CheckBox 
                        text={'~1時間'}
                        checked={MatchingStore.one}
                        onPress={MatchingStore.toggleOne}
                        disabled={disabled || isMatching}
                    />
                    <CheckBox 
                        text={'~1.5時間'}
                        checked={MatchingStore.oneHalf}
                        onPress={MatchingStore.toggleOneHalf}
                        disabled={disabled || isMatching}
                    />
                    <CheckBox 
                        text={'~2時間'}
                        checked={MatchingStore.two}
                        onPress={MatchingStore.toggleTwo}
                        disabled={disabled || isMatching}
                    />
                </Row>

                <EntryButton {...color} disabled={disabled} onPress={MatchingStore.toggle.bind(this)} {...this.props}>
                    <ButtonText>{text}</ButtonText>
                </EntryButton>
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