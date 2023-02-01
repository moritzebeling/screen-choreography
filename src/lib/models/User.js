import { Device } from './Device.js';

export class User {

    /*
    @todo
    - remove password
    */

    /**
     * @param {Object} options
     * @param {string} options.id
     * @param {string} options.password
     * @param {string} options.agent
     * @param {string} options.system
     * @param {string} options.browser
     * @param {string} options.lang
     * @param {boolean} options.touch
     */
    
    constructor( options = {} ){
        this.id = options.id || null;
        this.password = options.password || null;
        this.agent = options.agent || null;
        this.system = options.system || null;
        this.browser = options.browser || null;
        this.lang = options.lang || null;
        this.touch = options.touch || false;
    }

    static detectDevice(){
        if( !window || !navigator ){
            return false;
        }
        return {
            agent: Device.detectAgent(),
            system: Device.detectSystem(),
            browser: Device.detectBrowser(),
            lang: Device.detectLanguage(),
            touch: Device.detectTouch()
        };
    }

}