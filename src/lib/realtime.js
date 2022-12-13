import ioClient from "socket.io-client";
import { writable } from 'svelte/store';
import { PUBLIC_SOCKET } from '$env/static/public';

const socket = ioClient(PUBLIC_SOCKET);

export const io = socket;

export const user = writable({id:null,num:null});
export const users = writable(0);