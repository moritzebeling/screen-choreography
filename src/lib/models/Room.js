import { slug } from '../../../server/helpers.js';

export class Room {
    
    constructor(){
        this._id = null;
        this._password = null;
        this._isPublic = false;
        this._dateOpened = new Date();
        this._dateLastVisited = new Date();
        this._dimensions = false;
        /*
        dimensions
        - false: no x or y dimension
        - {x: true}: x dimension only, as many as given
        - {x: 8}: x dimension only, 8 max
        - {x: true, y: true}: x and y dimension, each as many as given
        - {x: true, y: 2}: x and y dimension, x as many as given, 2 max y
        */
    }

}