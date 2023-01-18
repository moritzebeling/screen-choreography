import { browser } from '$app/environment';
import { Color } from './Color.js';

export class Composition {

    constructor( options = {} ){
        this.styles = options.styles;
        this.timing = options.timing;
        this.keyframes = options.keyframes;
    }

    styleAttr(){
        return Object.keys(this.styles).map(prop => {
            return `${prop}: ${this.styles[prop]};`;
        }).join(' ');
    }

}