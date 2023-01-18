export class Color {

    /**
     * @param {number} r 
     * @param {number} g 
     * @param {number} b 
     */

    constructor( color ) {
        this.set( color );
    }

    /**
     * @param {Color} color
     */

    set( color ){
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
    }

    toHtml( seperator = '<br />' ){
        return [this.r,this.g,this.b].join( seperator );
    }
    toCss(){
        return `background-color:rgb(${this.r},${this.g},${this.b});`
    }

}