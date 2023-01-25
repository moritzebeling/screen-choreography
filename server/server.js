import http from "http";
import express from 'express';
import { socketServer } from './socket';
import * as dotenv from 'dotenv';
import { handler } from '../build/handler';

dotenv.config();

const app = express();
const server = http.createServer(app);

socketServer(server);

app.use(handler);

server.listen( process.env.PORT, () => {
    console.log(`SvelteKit and Socket.io running on ${process.env.HOST}:${process.env.PORT} serving ${process.env.PUBLIC_SOCKET}`);
});