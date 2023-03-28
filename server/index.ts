import express, { json } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { GptRoute } from './4-controllers/gptRoute';
dotenv.config();

const server = express();

server.use(json());
server.use(cors());

server.use('/api', GptRoute)

server.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
})
