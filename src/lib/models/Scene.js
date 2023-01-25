import { Color } from './Color';
import { Composition } from './Composition';

export class Scene {
    
    constructor(options = {}){
        this.background = new Color( options.background || new Color(0,0,255) );
        this.backgroundSpeed = options.backgroundSpeed || 1000;
        this.animation = new Composition( options.animation || {} );
    }

}