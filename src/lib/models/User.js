import { Device } from './Device.js';

export class User {

    /**
     * @param {Object} options
     * @param {string} options.id
     * @param {string} options.agent
     * @param {string} options.system
     * @param {string} options.browser
     * @param {string} options.language
     * @param {boolean} options.touch
     * @param {number} options.position
     */
    
    constructor( options = {} ){
        this.id = options.id || null;
        this.agent = options.agent || null;
        this.system = options.system || null;
        this.browser = options.browser || null;
        this.language = options.language || null;
        this.touch = options.touch || null;
        this.position = options.position || null;
    }

    detectTouch(){
        this.touch = Device.detectTouch();
    }

    setPosition( pos ){
        this.position = pos === -1 ? null : pos;
    }

}