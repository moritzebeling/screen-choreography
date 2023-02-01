export class Composition {

    /*
    @todo
    - refactor
    - type annotations
    - simplify naming (composition? animation?, ...)
    */

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