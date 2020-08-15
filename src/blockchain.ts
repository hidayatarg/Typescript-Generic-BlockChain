import * as CryptoJS from 'crypto-js';
import {isValidChain, isValidNewBlock} from './blochainValidations';
import {broadcastLatest} from './p2p';

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public timestamp: number;
    public data: string;

    constructor(index: number, hash: string, previousHash: string, timestamp: number, data: string) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
    }
}

const genesisBlock: Block = new Block(
    0,
    '816534932c2b7154242da6afc367695e6337db8a921823784c14378abed4f7d7',
    '',
    1465151705,
    'Genesis Block!!'
);

let blockchain = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const calculateHashForBlock = (block: Block): string =>
    calculateHash(block.index, block.previousHash, block.timestamp, block.data);

const calculateHash = (index: number, previousHash: string, timestamp: number, data: string): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();


const mineBlock = (newBlock: Block) => {
    // addToBlockchain
    if (isValidNewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock);
        return true;
    }
    return false;
}

const generateNextBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const nextIndex: number = previousBlock.index + 1;
    const nextTimestamp: number = new Date().getTime() / 1000;
    const nextHash: string = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, data);
    const newBlock: Block = new Block(nextIndex, nextHash, previousBlock.hash, nextTimestamp, data);
    mineBlock(newBlock);
    console.log(newBlock)
    broadcastLatest();
    return newBlock
    // return all blockchain


}

// get a chain of blocks
const replaceChain = (newBlocks: Block[]) => {
    if (isValidChain(newBlocks) && newBlocks.length > getBlockchain().length) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        blockchain = newBlocks;
        broadcastLatest();
    } else {
        console.log('Received blockchain invalid');
    }
};


export{
    Block,
    genesisBlock,
    getLatestBlock,
    calculateHashForBlock,
    getBlockchain,
    generateNextBlock,
    mineBlock,
    replaceChain
}