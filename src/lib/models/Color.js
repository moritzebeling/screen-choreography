export class Color {

    /**
     * @param {Object} options
     * @param {number} options.r
     * @param {number} options.g
     * @param {number} options.b
     */

    constructor( options = {} ) {
        this.r = options.r || 0;
        this.g = options.g || 0;
        this.b = options.b || 0;
    }

    /**
     * @param {Object} options
     * @param {number} options.r
     * @param {number} options.g
     * @param {number} options.b
     */
    update( options ){
        this.r = options.r || 0;
        this.g = options.g || 0;
        this.b = options.b || 0;
    }

    toHtml( seperator = '<br />' ){
        return [this.r,this.g,this.b].join( seperator );
    }
    toCss(){
        return `background-color:rgb(${this.r},${this.g},${this.b});`
    }

}