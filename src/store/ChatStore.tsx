import Moment from 'moment';
import { Alert, } from 'react-native';
import { observable, computed, action } from 'mobx';
import { IMessage } from 'react-native-gifted-chat';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import * as C from '../lib/Const';
import Firebase from '../lib/Firebase';
import Amplitude from '../lib/Amplitude';

import UserStore from './UserStore';

class ChatStore {
    private _ref:FirebaseFirestoreTypes.CollectionReference;
    get ref() { return this._ref;}
    set ref(ref:FirebaseFirestoreTypes.CollectionReference) { this._ref = ref}
    private unsubscribe:Function;

    private _isViewable:boolean = false;
    get isViewable() { return this._isViewable };
    set isViewable(f:boolean) { this._isViewable = f};

    // Chat
    @observable _messages:Array<IMessage> = new Array<IMessage>();
    @computed get messages() {
        return this._messages.filter((v:any, i) => {
            if (v.reporter && v.reporter.indexOf(UserStore.id) !== -1) return false;
            if (UserStore.ngList && UserStore.ngList.indexOf(v.user._id) !== -1) return false;

            // 2時間以上前のメッセージは見せない
            let limitTime = Moment().add(-2, 'hours');
            const createdAt = (v.createdAt as FirebaseFirestoreTypes.Timestamp)
            if (Moment.unix(createdAt.seconds) < limitTime) return false;
            return true;
        });
    }
    set messages(messages:Array<IMessage>) {
        this._messages = messages;
        if (!this.latestReadMessage) this.readMessage();
    }

    @observable latestReadMessage:IMessage;

    @computed get unreadNumber() {
        if (!this.latestReadMessage) return 0;

        let i = 0;
        for (i = 0; i < this.messages.length; i++) {
            if (this.latestReadMessage._id === this.messages[i]._id) break;
        }
        return i;
    }

    constructor() {
    }

    public observe = () => {
        this.unsubscribe = this._ref.orderBy('createdAt', 'desc').onSnapshot(this.updated);
    }

    public stopObserve = () => {
        this.unsubscribe();
    }

    @action
    public readMessage = () => {
        this.latestReadMessage = this.messages[0];
    }

    private updated = (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
        const messages:Array<IMessage> = [];
        for (let doc of snapshot.docs) {
            const data = doc.data();

            const ts = data.createdAt as FirebaseFirestoreTypes.Timestamp;
            data.createdAt = ts.toDate();
            messages.push(data as IMessage);
        };
        this.messages = messages;
        if (this.isViewable) this.readMessage();
    }

    public addChat = (messages:Array<IMessage>) => {
        Amplitude.info('ArenaAddChat', null);
        messages.forEach((message) => {
            this._ref.doc(message._id).set(message)
                .catch((error) => Amplitude.error('ArenaStore addChat', error))
            ;
        });
    }

    public reportChat = (message:any) => {
        Amplitude.info('ArenaReportChat', {user: message.user});
        const reporter = message.reporter ? message.reporter : [];
        reporter.push(UserStore.id);
        this._ref.doc(message._id).update({
            reporter: reporter
        })
            .catch((error) => Amplitude.error('ArenaStore reportChat', error))
        ;
    }

    public reportChatAlert = (context, message:IMessage) => {
        if (message.user._id === UserStore.id) return;

        Alert.alert('', '発言"'+message.text+'"を通報しますか？', [
            { text: '通報する', onPress: () => {this.reportChat(message)} },
            { text: 'Cancel' }
        ]);
    }

    public addNgListAlert = (user:any) => {
        if (UserStore.ngList && UserStore.ngList.indexOf(user._id) !== -1) return;
        if (UserStore.ngList && UserStore.ngList.length >= C.UserNgLimit) {
            alert('NGリストは'+C.UserNgLimit+'件までです。');
            return;
        }

        const text = 'ユーザー"'+user.name+'"をNGリストに追加しますか？\n'
            +'NGリストに追加するとチャットが表示されなくなります。'
            +'NGリストからの削除機能は今後実装予定です。'
        ;

        Alert.alert('', text, [
            {
                text: '追加する', onPress: () => {
                    UserStore.asyncAddNgList(user)
                    .then(() => this.messages = this._messages) // update
                }
            },
            { text: 'Cancel' }
        ]);
    }

}


export default new ChatStore();