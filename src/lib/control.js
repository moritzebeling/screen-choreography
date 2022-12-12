import { writable } from 'svelte/store';

export const scenes = [
    ['sorting','Sorting'],
    ['random','Random'],
    ['synchronize','Synchronize'],
    ['colors','Colors'],
    ['left-to-right','Left to Right'],
    ['circle','Circle'],
    ['bottom-to-top','Bottom to Top'],
    ['qr','QR'],
    ['touch-display','Touch'],
];

export const pastScenes = writable([]);

export function switchScene( id ){

    pastScenes.update( list => {
        list = [id,...list];
        return list;
    });

    console.log('send scene', id);
}