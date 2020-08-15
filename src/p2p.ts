import * as WebSocket from 'ws';
import { Server } from 'ws';
import { mineBlock, Block, getBlockchain, getLatestBlock, replaceChain } from './blockchain';
import { isValidBlockStructure } from './blochainValidations';

const sockets: WebSocket[] = [];

enum MessageType {
    QUERY_LATEST = 0,
    QUERY_ALL = 1,
    RESPONSE_BLOCKCHAIN = 2,
}
class Message {
    public type: MessageType;
    public data: any;
}

class p2p {
    public blockchain: Block[];
    public sockets: [];

    constructor(blockchain: Block[]){
        this.blockchain = blockchain;
        this.sockets = [];
    }

}

const getSockets = () => sockets;


const initP2PServer = (p2pPort: number) => {
    const server: Server = new WebSocket.Server({ port: p2pPort });
    server.on('connection', (ws: WebSocket) => {
        initConnection(ws);
    });
    console.log('listening websocket p2p port on: ' + p2pPort);
};

const initConnection = (ws: WebSocket) => {
    sockets.push(ws);
    console.log('Socket connected');
    initMessageHandler(ws);
    sendChain(ws)

};

const JSONToObject = <T>(data: string): T => {
    try {
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        return null;
    }
};

const initMessageHandler = (ws: WebSocket) => {
    ws.on('message', (data: string) => {
        const message: Message = JSONToObject<Message>(data);
        if (message === null) {
            console.log('could not parse received JSON message: ' + data);
            return;
        }

        console.log('Received message' + JSON.stringify(message));
        // console.log('data', data);

        
    });
};

const sendChain = (ws: WebSocket) => {
    ws.send(JSON.stringify(getLatestBlock()));
}

const broadcastLatest = () => {
    sockets.forEach((socket) => sendChain(socket));
}


const connectToPeers = (newPeer: string): void => {
    const ws: WebSocket = new WebSocket(newPeer);
    ws.on('open', () => {
        initConnection(ws);
    });
    ws.on('error', () => {
        console.log('connection failed');
    });
};

export {broadcastLatest, connectToPeers, initP2PServer, getSockets}



