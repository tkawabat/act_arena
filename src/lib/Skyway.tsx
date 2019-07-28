import Moment from 'moment';
import { Peer } from 'react-native-skyway';

const options = {
    key: '9b68cd86-829d-4e0e-884e-bbe6c75e12e5'
    , domain: 'localhost'
    , mode: 'sfu'
    , debug: 3
};

class Skyway {

    constructor() {
        const m = Moment();
        const PEER_ID = m.format("YYYYMMDDHHmmss");  
        this.peer = new Peer(PEER_ID, options);

        this.onPeerOpen = this.onPeerOpen.bind(this);
        this.peer.connect();
        this.peer.addEventListener('peer-open', this.onPeerOpen);
    }

    private onPeerOpen() {
        console.log("open");
        this.peer.joinRoom("hogehoge");
        //this.setState({ open: true });
    }

    //const roomId = 'hogehoge';
}


export default Skyway;