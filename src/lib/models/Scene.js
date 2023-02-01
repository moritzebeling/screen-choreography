import { Color } from './Color.js';
import { Composition } from './Composition.js';

export class Scene {

    /*
    @todo
    - refactor
    - type annotations
    - simplify naming (composition? animation?, scene?...)
    */
    
    constructor(options = {}){
        this.background = new Color( options.background || {r:0,g:0,b:255} );
        this.backgroundSpeed = options.backgroundSpeed || 1000;
        this.animation = new Composition( options.animation || {} );
    }

}