import { animations } from "../../routes/live/[room]/animations/animations.js";

export class Animation {

    /**
     * @param {Object} options
     * @param {string} options.name animation name
     * @param {number} options.radius border radius between 0 and 1
     * @param {number} options.x x size between 0 and 1
     * @param {number} options.y y size between 0 and 1
     * @param {number} options.columns between 1 and 12
     * @param {number} options.rows between 1 and 12
     */

    constructor( options = {} ){
        this.name = options.name || Object.keys(animations)[0];
        this.radius = options.radius || 0;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.columns = options.columns || 0;
        this.rows = options.rows || 0;
    }

}