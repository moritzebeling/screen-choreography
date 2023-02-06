import { writable } from 'svelte/store';

export const time = writable(new Date());
export const seconds = writable(0);

function roundedTimestamp( input ){
    input = input || Date.now();
    return Math.floor( input / 1000 );
}

let start = roundedTimestamp();
let last = start;

export function tick(){
    let now = roundedTimestamp();
    if( now !== last ){

        let d = new Date( now * 1000 );
        
        time.set( d );
        seconds.set( now );
        
        last = now;
    }
    requestAnimationFrame(tick);
}

export function getSecondsInYear( year = 2023 ){
    return Date.now() - new Date( year ).getTime();
}