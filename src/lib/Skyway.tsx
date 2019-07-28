import Moment from 'moment';
import { Peer } from 'react-native-skyway';
import { observable, action } from 'mobx';

enum Status {
    INIT
    , OPEN
    , JOIN
}

const options = {
    key: '9b68cd86-829d-4e0e-884e-bbe6c75e12e5'
    , domain: 'localhost'
    , mode: 'sfu'
    , debug: 3
};

class Skyway {
    @observable state = Status.INIT;

    constructor() {
        const m = Moment();
        const PEER_ID = m.format("YYYYMMDDHHmmss");  
        this.peer = new Peer(PEER_ID, options);

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
        this.state = Status.OPEN;
        this.peer.joinRoom("hogehoge");
        //this.setState({ open: true });
    }

    private onPeerCall() {
        console.log("onPeerCall");
        this.state = Status.OPEN;
        this.peer.joinRoom("hogehoge");
        //this.setState({ open: true });
    }

    private onPeerError() {
        console.log("onPeerError");
        //this.dispose();
        // TODO
    }

    private onPeerClose() {
        console.log("onPeerClose");
        //this.dispose();
        // TODO
    }

    onMediaConnectionError() {
        console.log("onMediaConnectionError");
        //this.dispose();
    }

    onMediaConnectionClose() {
        console.log("onMediaConnectionClose");
        //this.dispose();
        //this.dispose();
    }

    onRoomOpen() {
        console.log("onRoomOpen");
        this.state = Status.JOIN;
    }

    onRoomPeerJoin() {
        console.log("onRoomPeerJoin");
        this.peer.listAllPeers(console.log)
    }

    onRoomPeerLeave() {
        console.log("onRoomPeerLeave");
    }

    onRoomLog() {
        console.log("onRoomLog");
    }

    onRoomStream() {
        console.log("onRoomStream");
    }

    onRoomRemoveStream() {
        console.log("onRoomRemoveStream");
    }

    onRoomData() {
        console.log("onRoomData");
        this.peer.disconnect();
    }

    onRoomClose() {
        console.log("onRoomClose");
    }

    onRoomError() {
        console.log("onRoomError");
    }

    //const roomId = 'hogehoge';
}


export default new Skyway();
