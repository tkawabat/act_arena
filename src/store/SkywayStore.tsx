import Moment from 'moment';
import { Peer } from 'react-native-skyway';
import { observable, action } from 'mobx';

import * as C from '../lib/Const';
import Secret from '../lib/Secret';

import ConfigStore from './ConfigStore';


class SkywayStore {
    @observable state = C.SkywayState.INIT;
    @observable speakState = C.SpeakState.DISABLED;

    private peer : Peer;

    @action setSpeakState = (state:C.SpeakState) => {
        this.speakState = state;
    }

    private onPeerOpen = () => {
        console.log("onPeerOpen");
        this.state = C.SkywayState.OPEN;
        ConfigStore.skyway = true;
        this.speakState = C.SpeakState.DISABLED;
    }

    private onPeerCall = () => {
        console.log("onPeerCall");
        //this.state = C.SkywayState.OPEN;
    }

    private onPeerError = () => {
        ConfigStore.skyway = false;
        //this.dispose();
        // TODO
    }

    private onPeerClose = () => {
        console.log("onPeerClose");
        this.state = C.SkywayState.INIT;
        this.speakState = C.SpeakState.DISABLED;
        ConfigStore.skyway = false;
        this.peer.disconnect();
    }

    private onMediaConnectionError = () => {
        console.log("onMediaConnectionError");
        //this.dispose();
    }

    private onMediaConnectionClose = () => {
        console.log("onMediaConnectionClose");
        //this.dispose();
    }

    private onRoomOpen = () => {
        console.log("onRoomOpen");
        this.state = C.SkywayState.JOIN;
        this.setLocalStreamStatus(false);
        this.speakState = C.SpeakState.DISABLED;
    }

    private onRoomPeerJoin = () => {
        console.log("onRoomPeerJoin");
        this.peer.listAllPeers(console.log);
    }

    private onRoomPeerLeave = () => {
        console.log("onRoomPeerLeave");
    }

    private onRoomLog = () => {
        console.log("onRoomLog");
    }

    private onRoomStream = () => {
        console.log("onRoomStream");
    }

    private onRoomRemoveStream = () => {
        console.log("onRoomRemoveStream");
    }

    private onRoomData = () => {
        console.log("onRoomData");
    }

    private onRoomClose = () => {
        console.log("onRoomClose");
        this.state = C.SkywayState.OPEN;
        this.speakState = C.SpeakState.DISABLED;
    }

    private onRoomError = () => {
        console.log("onRoomError");
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
}


export default new SkywayStore();