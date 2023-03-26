import express, { json } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { UserRoute } from './4-controllers/userRoute';
import { GuestRoute } from './4-controllers/guestRoute';
import { GptRoute } from './4-controllers/gptRoute';
dotenv.config();

const server = express();

server.use(json());
server.use(cors());

server.use('/api', UserRoute)
server.use('/api', GuestRoute)
server.use('/api', GptRoute)

server.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
})
