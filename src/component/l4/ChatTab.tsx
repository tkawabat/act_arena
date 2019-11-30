import React, {Component} from 'react';
import { Platform } from 'react-native';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import * as C from '../../lib/Const';
import ArenaStore from '../../store/ArenaStore';
import UserStore from '../../store/UserStore';


@observer
export default class ChatTab extends Component {

    render() {
        return (
            <Root>
                <GiftedChat
                    messages={ArenaStore.messages}
                    onSend={ArenaStore.addChat}
                    onPressAvatar={ArenaStore.addNgListAlert}
                    onLongPress={ArenaStore.reportChatAlert}
                    dateFormat={'MM/DD'}
                    timeFormat={'HH:mm'}
                    maxInputLength={40}
                    user={{
                        _id: UserStore.id,
                        name: UserStore.name
                    }}
                />
                {Platform.OS === 'android' && <KeyboardSpacer />}
            </Root>
        );
    }
}

const Root = styled.View`
    flex: 1;
`
