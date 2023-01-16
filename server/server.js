import http from "http";
import express from 'express';
import { socketServer } from './socket.js';

import { handler } from '../build/handler.js';

const app = express();
const server = http.createServer(app);

socketServer(server);

app.use(handler);

server.listen( process.env.PORT, () => {
    console.log(`SvelteKit and Socket.io running on ${process.env.PUBLIC_SOCKET}`);
});