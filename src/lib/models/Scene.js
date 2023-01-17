import { Color } from './Color.js';

export class Scene {

    _default = {
        background: new Color(0,0,255),
        backgroundSpeed: 1000,
    };
    
    constructor(options = {}){
        this.background = new Color( options.background || this._default.background );
        this.backgroundSpeed = options.backgroundSpeed || this._default.backgroundSpeed;
    }

}