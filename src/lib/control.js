import { writable } from 'svelte/store';
import { socket } from "$lib/realtime";

export const scenes = [
    ['intro','Intro'],
    ['sorting','Sorting'],
    ['pulse','Pulse'],
    ['synchronize','Synchronize'],
    ['colors','Colors'],
    ['circle','Circle'],
    ['up','Up'],
    ['qr','QR'],
    ['touch','Touch'],
];

export const currentScene = writable('intro');

export const pastScenes = writable(['intro']);

export function switchScene( id ){

    socket.emit("setScene", id);

    pastScenes.update( list => {
        list = [id,...list];
        return list;
    });

    console.log('send scene', id);
}