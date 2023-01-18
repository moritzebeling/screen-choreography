import { Color } from './Color.js';
import { Composition } from './Composition.js';

export class Scene {

    _default = {
        background: new Color(0,0,255),
        backgroundSpeed: 1000,
        animation: {},
    };
    
    constructor(options = {}){
        this.background = new Color( options.background || this._default.background );
        this.backgroundSpeed = options.backgroundSpeed || this._default.backgroundSpeed;
        this.animation = new Composition( options.animation || this._default.animation );
    }

}