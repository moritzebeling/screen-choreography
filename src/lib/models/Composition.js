import { browser } from '$app/environment';
import { Color } from './Color';

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