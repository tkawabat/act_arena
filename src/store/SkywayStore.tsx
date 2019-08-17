import Moment from 'moment';
import { Peer } from 'react-native-skyway';
import { observable, action } from 'mobx';

import * as C from '../lib/Const';
import Secret from '../lib/Secret';


class Skyway {
    @observable state = C.SkywayState.INIT;
    @observable speakState = C.SpeakState.DISABLED;

    private peer : Peer;

    constructor() {
        const m = Moment();
        const PEER_ID = m.format("YYYYMMDDHHmmss");  
        this.peer = new Peer(PEER_ID, Secret.skyway);

        this.onPeerOpen = this.onPeerOpen.bind(this);
        this.onPeerClose = this.onPeerClose.bind(this);
        this.onPeerCall = this.onPeerCall.bind(this);
        this.onPeerError = this.onPeerError.bind(this);
        this.onMediaConnectionError = this.onMediaConnectionError.bind(this);
        this.onMediaConnectionClose = this.onMediaConnectionClose.bind(this);
        this.onRoomOpen = this.onRoomOpen.bind(this);
        this.onRoomPeerJoin = this.onRoomPeerJoin.bind(this);
        this.onRoomPeerLeave = this.onRoomPeerLeave.bind(this);
        this.onRoomLog = this.onRoomLog.bind(this);
        this.onRoomStream = this.onRoomStream.bind(this);
        this.onRoomRemoveStream = this.onRoomRemoveStream.bind(this);
        this.onRoomData = this.onRoomData.bind(this);
        this.onRoomClose = this.onRoomClose.bind(this);
        this.onRoomError = this.onRoomError.bind(this);

        this.toggleMicrophone = this.toggleMicrophone.bind(this);

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

    private onPeerOpen() {
        console.log("onPeerOpen");
        this.state = C.SkywayState.OPEN;
        this.speakState = C.SpeakState.DISABLED;
    }

    private onPeerCall() {
        console.log("onPeerCall");
        //this.state = C.SkywayState.OPEN;
    }

    private onPeerError() {
        console.log("onPeerError");
        //this.dispose();
        // TODO
    }

    private onPeerClose() {
        console.log("onPeerClose");
        this.state = C.SkywayState.INIT;
        this.speakState = C.SpeakState.DISABLED;
        //this.dispose();
        // TODO
    }

    private onMediaConnectionError() {
        console.log("onMediaConnectionError");
        //this.dispose();
    }

    private onMediaConnectionClose() {
        console.log("onMediaConnectionClose");
        //this.dispose();
    }

    private onRoomOpen() {
        console.log("onRoomOpen");
        this.state = C.SkywayState.JOIN;
        this.setLocalStreamStatus(false);
        this.speakState = C.SpeakState.MUTE;
    }

    private onRoomPeerJoin() {
        console.log("onRoomPeerJoin");
        this.peer.listAllPeers(console.log);
    }

    private onRoomPeerLeave() {
        console.log("onRoomPeerLeave");
    }

    private onRoomLog() {
        console.log("onRoomLog");
    }

    private onRoomStream() {
        console.log("onRoomStream");
    }

    private onRoomRemoveStream() {
        console.log("onRoomRemoveStream");
    }

    private onRoomData() {
        console.log("onRoomData");
    }

    private onRoomClose() {
        console.log("onRoomClose");
        this.state = C.SkywayState.OPEN;
        this.speakState = C.SpeakState.DISABLED;
    }

    private onRoomError() {
        console.log("onRoomError");
        this.state = C.SkywayState.OPEN;
        this.speakState = C.SpeakState.DISABLED;
    }

    public disconnect() :void {
        this.peer.disconnect();
    }

    public join(roomName:string) :void {
        this.peer.joinRoom(roomName);
    }

    public leave() :void {
        this.peer.leaveRoom();
    }

    public setLocalStreamStatus(status) :void {
        this.peer.setLocalStreamStatus(status);
    }

    public toggleMicrophone() :void {
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

    //const roomId = 'hogehoge';
}


export default new Skyway();