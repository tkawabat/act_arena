import React, {Component} from 'react';
import { Text, } from 'native-base';
import Modal from 'react-native-modal';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as C from '../../lib/Const';
import PushStore from '../../store/PushStore';
import ArenaScenarioStore from '../../store/ArenaScenarioStore';

import RectangleTextButton from '../l1/RectangleTextButton';
import CheckBox from '../l1/CheckBox';


interface props {

}

@observer
export default class PushSettingModal extends Component<props> {

    private createBasicSetting = () => {
        const ret = [];

        Object.entries(C.PushBasicSettingString).forEach(([key, value]) => {
            const settingKey = parseInt(key) as C.PushBasicSettingKey;
            ret.push(<CheckBox
                key={key}
                text={C.PushBasicSettingString[settingKey]}
                checked={PushStore.basicSettings.includes(settingKey)}
                onPress={() => PushStore.toggleBasicSetting(settingKey)}
            />);
        });

        return ret;
    }

    private createTemporarySettingString = () => {
        let ret = '現在の設定：';
        if (PushStore.temporarySettingString) {
            ret += '『'+PushStore.temporarySettingString+'』'
        } else {
            ret += 'なし';
        }

        return ret;
    }

    private createTemporarySettingButtion = (onoff:boolean, time:number) => {
        const text = time+'時間 '+(onoff ? 'ON' : 'OFF');
        return (
            <TemporaryButton
                text={text}
                disabled={false}
                onPress={PushStore.updateTemporarySetting.bind(this, onoff, time)}
            />
        )
    }

    render() {
        return (
            <Modal
                isVisible={PushStore.settingModal}
                onBackdropPress={PushStore.hideSettingModal}
                backdropOpacity={0.4}
                animationIn='slideInRight'
                animationOut='slideOutLeft'
            >
                <Root>
                    <Title>■通知基本設定</Title>
                    <Section>
                        {this.createBasicSetting()}
                    </Section>

                    <Title>■今だけ通知</Title>
                    <Section>
                        <TemporaryText>
                            {this.createTemporarySettingString()}
                        </TemporaryText>
                    </Section>
                    <Section>
                        <Line>
                            {this.createTemporarySettingButtion(true, 1)}
                            {this.createTemporarySettingButtion(true, 3)}
                        </Line>
                        <Line>
                            {this.createTemporarySettingButtion(false, 1)}
                            {this.createTemporarySettingButtion(false, 3)}
                        </Line>
                        <Line>
                            <TemporaryButton text={'解除'} disabled={false} onPress={PushStore.updateTemporarySetting.bind(this, true, -1)} />
                        </Line>
                    </Section>
                    <Footer>
                        <RectangleTextButton text={'戻る'} disabled={false} onPress={PushStore.hideSettingModal} />
                    </Footer>
                </Root>
            </Modal>
        );
    }
}

const Root = styled.View`
    text-align: center;
    background-color: #FFF;
    padding: 15px;
    border-color: #444;
    border-width: 2px;
    border-radius: 5px;
`

const Title = styled.Text`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
`

const Section = styled.View`
    /* flex-direction: row; */
    justify-content: center;
    margin-horizontal: 10px;
    margin-bottom: 15px;
`

const Line = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
`

const TemporaryText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    margin-left: 10px;
    margin-vertical: 3px;
`

const TemporaryButton = styled(RectangleTextButton)`
    width: 100px;
    margin-horizontal: 10px; 
`

const Footer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 15px;
`