import { uniqueId } from '../helpers';

/*
system: 'unknown' | 'windows' | 'mac' | 'linux' | 'ios' | 'android'
*/

export class User {
    
    constructor( options = {} ){
        this.id = options.id || null;
        this.password = options.password || null;
        this.system = options.system || null;
        this.lang = options.lang || false;
        this.touch = options.touch || false;
    }

    static detectDevice(){
        if( !window || !navigator ){
            return false;
        }
        return {
            system: null,
            lang: navigator.language,
            touch: ( 'ontouchstart' in window ) || ( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 ),
        };
    }

    assignId(){
        this.id = uniqueId( 32 );
        return this.id;
    }

}