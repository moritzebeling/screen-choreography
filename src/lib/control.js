import { writable } from 'svelte/store';

export const signals = [
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

export const usedSignals = writable([]);

export function sendSignal( id ){

    usedSignals.update( list => {
        list = [id,...list];
        return list;
    });

    console.log('send signal', id);
}