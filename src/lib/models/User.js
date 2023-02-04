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
     */
    
    constructor( options = {} ){
        this.id = options.id || null;
        this.agent = options.agent || null;
        this.system = options.system || null;
        this.browser = options.browser || null;
        this.language = options.language || null;
        this.touch = options.touch || null;
    }

    detectTouch(){
        this.touch = Device.detectTouch();
    }

}