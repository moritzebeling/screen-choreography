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

        this.background = options.background || 'white';
        this.speed = options.speed || 1000;
        
        this.color = options.color || false;
        this.fadeIn = options.fadeIn || 2000;
        this.fadeOut = options.fadeOut || 2000;

        this.rotate = options.rotate || false;
        this.interval = options.interval || 2000;

    }

}