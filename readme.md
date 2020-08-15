## A Generic BlockChain 
This is a generic blockchain made for generic purpose. By Hidayat Arghandabi in 2020 AUG. 


### End Points

 Name          | Description | Request Type  | Address |  Body |
| ------------- | ------------- |------------- | ------------- |------------- |
| GetBlocks  | List all blocks in blochain  |HTTPGET  | http://localhost:3001/blocks  |   No Body|
| MineBlock  | Add a block to the blockchain  |HTTPPOST | http://localhost:3001/mineBlock  | {"data" : "Hidayat Trasfer 1 BTC to Satoshi"} |
| Peers  | List all WebSocket Peers  |HTTPGET | http://localhost:3001/peers  | No Body |
| AddPeer  | Register a Peer to WebSocket  |HTTPPOST | http://localhost:3001/addPeer  | {"peer" : "ws://localhost:6003"} |

### NPM Scripts
| Script          | Description          |
| ------------- | ------------- |
| npm run prestart          | Compile JS to TS          |
| npm run start          | Compile JS to TS and run from JS          |
| npm run dev          | Run from TS node without compiling         |
| npm run build          | TS Build         |

## Register Peer
`HTTP_PORT=3003 P2P_PORT=6003 PEERS=ws://localhost:6001 npm run start` 

Then add the peer with postPeer HTTPPOST and instaneously in bash you can see the socket connected and reciving the blocks

### prerequisite and Packages
- Typescript Node, express and nodemon
    
```javascript 
npm i -D typescript ts-node nodemon @types/node @types/express
```

