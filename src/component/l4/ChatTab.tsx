import React, {Component} from 'react';
import { Platform } from 'react-native';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import * as C from '../../lib/Const';
import ChatStore from '../../store/ChatStore';
import UserStore from '../../store/UserStore';


@observer
export default class ChatTab extends Component {

    render() {
        return (
            <Root>
                <GiftedChat
                    messages={ChatStore.messages}
                    onSend={ChatStore.addChat}
                    onPressAvatar={ChatStore.addNgListAlert}
                    onLongPress={ChatStore.reportChatAlert}
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
