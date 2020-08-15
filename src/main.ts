import * as  bodyParser from 'body-parser';
import * as express from 'express';

import { Block, generateNextBlock, getBlockchain } from './blockchain';

const httpPort: number = parseInt(process.env.HTTP_PORT) || 3001;

const initHttpServer = ( myHttpPort: number ) => {
    const app = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => {
        res.send(getBlockchain());
    });

    app.post('/mineBlock', (req, res) => {
        const newBlock: Block = generateNextBlock(req.body.data);
        // res.send(newBlock);
        res.redirect('/blocks')
    });

    app.listen(myHttpPort, () => {
        console.log('Server Listening http on port: ' + myHttpPort);
    });
};

initHttpServer(httpPort);