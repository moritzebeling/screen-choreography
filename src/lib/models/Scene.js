import { Animation } from './Animation.js';

export class Scene {

    /**
     * @param {Object} options
     * @param {string} options.background
     * @param {string} options.color
     * @param {string} options.text
     * @param {Animation} options.animation
     * @param {number} options.speed
     */
    
    constructor( options = {} ){
        /* background */
        this.background = options.background || 'black';
        
        /* content */
        this.color = options.color || 'white';
        this.text = options.text || null;
        this.animation = options.animation ? new Animation( options.animation ) : false;

        /* modifiers */
        this.speed = options.speed || 2000;
    }

    update( options = {} ){
        if( options.background ){
            this.background = options.background;
        }
        if( options.color ){
            this.color = options.color;
        }
        if( options.text ){
            this.text = options.text;
        }
        if( options.animation ){
            this.animation = options.animation;
        }
        if( options.speed ){
            this.speed = options.speed;
        }
        console.log('update scene', options, this);
    }

}