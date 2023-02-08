export class PerformanceScene {

    /**
     * @param {Object} options
     * @param {string} options.background
     * @param {string} options.color
     * @param {number} options.speed
     * @param {number} options.fadeIn
     * @param {number} options.fadeOut
     * @param {boolean} options.rotate
     * @param {number} options.interval
     */
    
    constructor( options = {} ){

        this.background = options.background || 'black';
        this.speed = options.speed || 1000;
        
        this.color = options.color || 'white';
        this.fadeIn = options.fadeIn || 100;
        this.fadeOut = options.fadeOut || 100;

        this.rotate = options.rotate || false;
        this.interval = options.interval || 1000;

    }

    apply( options ){
        if( options.hasOwnProperty('background') ){
            this.background = options.background;
            if( typeof document !== 'undefined' ){
                document.body.style.setProperty( '--background', this.background );
            }
        }
        if( options.hasOwnProperty('speed') ){
            this.speed = options.speed;
            if( typeof document !== 'undefined' ){
                document.body.style.setProperty( '--speed', this.speed + 'ms' );
            }
        }
        if( options.hasOwnProperty('color') ){
            this.color = options.color;
        }
        if( options.hasOwnProperty('rotate') ){
            this.rotate = options.rotate;
        }
        if( options.hasOwnProperty('interval') ){
            this.interval = options.interval;
        }
        if( options.hasOwnProperty('fadeIn') ){
            this.fadeIn = Math.min( this.interval, options.fadeIn );
        }
        if( options.hasOwnProperty('fadeOut') ){
            this.fadeOut = options.fadeOut;
        }
        return this;
    }

}