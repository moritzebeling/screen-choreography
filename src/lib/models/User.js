import { uniqueId } from '../helpers.js';

class Device {

    static detectSystem(){
        const userAgent = navigator.userAgent.toLowerCase();
        const options = [ 'windows', 'mac', 'linux', 'ios', 'android' ];
        for( const option of options ){
            if( userAgent.includes( option ) ){
                return option;
            }
        }
        return 'unknown';
    }
    
    static detectBrowser(){
        const userAgent = navigator.userAgent.toLowerCase();
        const options = [ 'chrome', 'firefox', 'safari', 'edge', 'opera' ];
        for( const option of options ){
            if( userAgent.includes( option ) ){
                return option;
            }
        }
        return 'unknown';
    }

    static detectLanguage(){
        const language = navigator.language.toLowerCase().substring(0,2);
        const options = [ 'en', 'de', 'fr' ];
        for( const option of options ){
            if( language.includes( option ) ){
                return option;
            }
        }
        return 'unknown';
    }

    static detectTouch(){
        return ( 'ontouchstart' in window ) || ( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 ) || false;
    }

}

export class User {
    
    constructor( options = {} ){
        this.id = options.id || null;
        this.password = options.password || null;
        this.system = options.system || null;
        this.browser = options.browser || null;
        this.lang = options.lang || false;
        this.touch = options.touch || false;
    }

    static detectDevice(){
        if( !window || !navigator ){
            return false;
        }
        return {
            system: Device.detectSystem(),
            browser: Device.detectBrowser(),
            lang: Device.detectLanguage(),
            touch: Device.detectTouch()
        };
    }

    assignId(){
        this.id = uniqueId( 32 );
        return this.id;
    }

}