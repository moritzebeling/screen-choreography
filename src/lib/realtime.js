import io from "socket.io-client";
import { writable } from 'svelte/store';
import { PUBLIC_SOCKET } from '$env/static/public';

export const socket = io(PUBLIC_SOCKET);

export const user = writable({id:null,num:null});
export const users = writable({total:0,ordered:0,mobile:0,pressed:0});