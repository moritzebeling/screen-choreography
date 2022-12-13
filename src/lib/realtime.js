import ioClient from "socket.io-client";
import { writable } from 'svelte/store';

const ENDPOINT = "http://localhost:5173";

const socket = ioClient(ENDPOINT);

export const io = socket;

export const user = writable({id:null,num:null});
export const users = writable(0);