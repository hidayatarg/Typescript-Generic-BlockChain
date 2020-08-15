## A Generic BlockChain 
This is a generic blockchain made for generic purpose. By Hidayat Arghandabi in 2020 AUG. 


### End Points

 Name          | Description | Request Type  | Address |  Body |
| ------------- | ------------- |------------- | ------------- |------------- |
| GetBlocks  | List all blocks in blochain  |HTTPGET  | http://localhost:3001/blocks  |   No Body|
| MineBlock  | Add a block to the blockchain  |HTTPPOST | http://localhost:3001/mineBlock  | {"data" : "Hidayat Trasfer 1 BTC to Satoshi"} |

### NPM Scripts
| Script          | Description          |
| ------------- | ------------- |
| npm run prestart          | Compile JS to TS          |
| npm run start          | Compile JS to TS and run from JS          |
| npm run dev          | Run from TS node without compiling         |
| npm run build          | TS Build         |


### prerequisite and Packages
- Typescript Node, express and nodemon
    
```javascript 
npm i -D typescript ts-node nodemon @types/node @types/express
```

