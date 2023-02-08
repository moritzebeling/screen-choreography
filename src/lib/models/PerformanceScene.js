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
        this.fadeIn = options.fadeIn || 200;
        this.fadeOut = options.fadeOut || 500;

        this.rotate = options.rotate || false;
        this.interval = options.interval || 1000;

    }

}