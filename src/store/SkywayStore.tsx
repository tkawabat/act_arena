import Moment from 'moment';
import { Peer } from 'react-native-skyway';
import { observable, action } from 'mobx';

import * as C from '../lib/Const';
import Secret from '../lib/Secret';
import Amplitude from '../lib/Amplitude';

import ConfigStore from './ConfigStore';


class SkywayStore {
    @observable state = C.SkywayState.INIT;
    @observable speakState = C.SpeakState.DISABLED;

    private peer : Peer;

    @action setSpeakState = (state:C.SpeakState) => {
        this.speakState = state;
    }

    private onPeerOpen = () => {
        Amplitude.info('onPeerOpen', null);
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
        this.peer = new Peer(id, Secret.skyway);

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
        this.peer.joinRoom(roomName);
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
}


export default new SkywayStore();