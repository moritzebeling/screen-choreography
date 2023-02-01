import { Color } from './Color.js';

export class ControlSettings {

    /*
    @todo
    - refactor
    - type annotations
    - simplify naming
    */

    _default = {
        colors: [
            new Color({r: 255, g: 255, b: 255}),
            new Color({r: 0, g: 0, b: 0}),

            new Color({r: 255, g: 0, b: 0}),
            new Color({r: 255, g: 255, b: 0}),
            
            new Color({r: 0, g: 255, b: 0}),
            new Color({r: 0, g: 255, b: 255}),
            
            new Color({r: 0, g: 0, b: 255}),
            new Color({r: 255, g: 0, b: 255}),
        ],
    };
    
    constructor(){
        this._colors = this._default.colors;
    }

    get colors(){
        return this._colors;
    }

    /**
     * @param {Color} color 
     */
    addColor( color ){
        this._colors.push( color );
    }

    /**
     * @param {number} i 
     */
    removeColor( i ){
        this._colors.splice( i, 1 );
    }

    resetColors(){
        this._colors = this._default.colors;
    }

}