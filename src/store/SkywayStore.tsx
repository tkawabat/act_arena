import Moment from 'moment';
import { Alert } from 'react-native';
import { Peer, MediaConstraints } from 'react-native-skyway';
import { observable, action } from 'mobx';

import * as C from '../lib/Const';
import Secret from '../lib/Secret';
import Amplitude from '../lib/Amplitude';
import Scheduler from '../lib/Scheduler';

import ConfigStore from './ConfigStore';


class SkywayStore {
    @observable state = C.SkywayState.INIT;
    @observable speakState = C.SpeakState.DISABLED;

    private peer : Peer;
    private testPeer: Peer;

    @action setSpeakState = (state:C.SpeakState) => {
        this.speakState = state;
    }

    private onPeerOpen = () => {
        this.state = C.SkywayState.OPEN;
        ConfigStore.setInitLoadComplete('skyway');
        this.speakState = C.SpeakState.DISABLED;
    }

    private onPeerCall = () => {
        //this.state = C.SkywayState.OPEN;
    }

    private onPeerError = () => {
        //this.dispose();
        Amplitude.error('onPeerError', null);
        alert('通話機能の初期化に失敗しました。');
    }

    private onPeerClose = () => {
        Amplitude.info('onPeerClose', null);
        this.state = C.SkywayState.INIT;
        this.speakState = C.SpeakState.DISABLED;
        //this.peer.disconnect();
    }

    private onMediaConnectionError = () => {
        Amplitude.error('onMediaConnectionError', null);
        //this.dispose();
    }

    private onMediaConnectionClose = () => {
        Amplitude.info('onMediaConnectionClose', null);
        //this.dispose();
    }

    private onRoomOpen = () => {
        this.state = C.SkywayState.JOIN;
        this.setLocalStreamStatus(false);
        this.speakState = C.SpeakState.DISABLED;
    }

    private onRoomPeerJoin = () => {
        //this.peer.listAllPeers(console.log);
    }

    private onRoomPeerLeave = () => {
    }

    private onRoomLog = () => {
    }

    private onRoomStream = () => {
    }

    private onRoomRemoveStream = () => {
    }

    private onRoomData = () => {
    }

    private onRoomClose = () => {
        this.state = C.SkywayState.OPEN;
        this.speakState = C.SpeakState.DISABLED;
    }

    private onRoomError = () => {
        Amplitude.error('onRoomError', null);
        this.state = C.SkywayState.OPEN;
        this.speakState = C.SpeakState.DISABLED;
    }

    public connect = (id: string): void => {
        this.peer = new Peer(id, Secret.skyway, {videoFlag: false, audioFlag: true} as MediaConstraints);

        this.peer.addEventListener('peer-open', this.onPeerOpen);
        this.peer.addEventListener('peer-close', this.onPeerClose);
        this.peer.addEventListener('peer-call', this.onPeerCall);
        this.peer.addEventListener('peer-error', this.onPeerError);
        this.peer.addEventListener('media-connection-close', this.onMediaConnectionClose);
        this.peer.addEventListener('media-connection-error', this.onMediaConnectionError);
        this.peer.addEventListener('room-open', this.onRoomOpen);
        this.peer.addEventListener('room-peer-join', this.onRoomPeerJoin);
        this.peer.addEventListener('room-peer-leave', this.onRoomPeerLeave);
        this.peer.addEventListener('room-log', this.onRoomLog);
        this.peer.addEventListener('room-stream', this.onRoomStream);
        this.peer.addEventListener('room-remove-stream', this.onRoomRemoveStream);
        this.peer.addEventListener('room-data', this.onRoomData);
        this.peer.addEventListener('room-close', this.onRoomClose);
        this.peer.addEventListener('room-error', this.onRoomError);

        this.peer.connect();
    }

    public disconnect = () :void => {
        this.peer.disconnect();
    }

    public join = (roomName:string) :void => {
        if (this.state === C.SkywayState.OPEN) {
            this.peer.joinRoom(roomName);
        }
    }

    public leave = () :void => {
        this.peer.leaveRoom();
    }

    public setLocalStreamStatus = (status) :void => {
        this.peer.setLocalStreamStatus(status);
    }

    public toggleMicrophone = () :void => {
        switch (this.speakState) {
            case C.SpeakState.SPEAK:
                this.peer.setLocalStreamStatus(false);
                this.speakState = C.SpeakState.MUTE;
                break;
            case C.SpeakState.MUTE:
                this.peer.setLocalStreamStatus(true);
                this.speakState = C.SpeakState.SPEAK;
                break;
            case C.SpeakState.DISABLED:
                break;
        }
        return;
    }

    public setDisabled = () :void => {
        this.speakState = C.SpeakState.DISABLED;
        if (this.peer) this.peer.setLocalStreamStatus(false);
    }

    public testTell = (userId) :void => {
        Amplitude.info('testTell', null);

        ConfigStore.load(true);
        if (!this.testPeer) {
            const id = 'test_' + userId + Moment().unix().toString();
            this.testPeer = new Peer(id, Secret.skyway);
            this.testPeer.addEventListener('peer-open', this.onTestTellPeerOpen);
            this.testPeer.connect();
        } else {
            // call function
            this.onTestTellPeerOpen();
        }
        Scheduler.setTimeout('', () => {            
            ConfigStore.load(false);
            Scheduler.setTimeout('', this.alertTestTell, 500);
        }, 2000);
    }

    private onTestTellPeerOpen = () :void => {
        const roomId = 'test_'+this.testPeer.peerId;
        this.testPeer.setLocalStreamStatus(true);
        
        this.peer.joinRoom(roomId);
        this.testPeer.joinRoom(roomId);
    }

    private closeTestTell = () :void => {
        this.peer.leaveRoom();
        this.testPeer.leaveRoom();
    }

    private alertTestTell = () : void => {
        const message = '自分の声が聞こえることを確認してください。'
            + 'わかりにくい場合は、イヤホンをすることをオススメします。'
            ;
        Alert.alert(
            'テスト通話中', message,
            [{
                text: 'テスト終了',
                onPress: this.closeTestTell
            }], { cancelable: false }
        )
    }
}


export default new SkywayStore();