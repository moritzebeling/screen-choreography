import { writable } from 'svelte/store';

export const time = writable(new Date());
export const seconds = writable(0);
export const duration = writable(0);

function timestamp( input ){
    input = input || Date.now();
    return Math.floor( input / 1000 );
}

let start = timestamp();
let last = start;

export function tick(){
    let now = timestamp();
    if( now !== last ){

        let d = new Date( timestamp() * 1000 );
        
        time.set( d );
        seconds.set( d.getSeconds() );
        duration.set( now - start );
        
        last = now;
    }
    requestAnimationFrame(tick);
}