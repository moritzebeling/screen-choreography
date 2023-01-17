import { uniqueId } from '../../../server/helpers.js';

export class User {
    
    constructor(){
        this._id = null;
        this._position = null;
        this._touch = null;
    }

    // id

    /**
     * @param {string|null} i
     */
    set id( i ){
        this._id = i;
    }
    get id(){
        return this._id;
    }
    assignId(){
        this.id = uniqueId();
    }

    // touch

    get touch(){
        return this._touch;
    }
    isTouch(){
        if( window ){
            this._touch = ( 'ontouchstart' in window ) || ( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 );
        }
        return this._touch;
    }

    // position

    /**
     * @param {number|null} p
     */
    set position( p ){
        this._position = p;
    }
    get position(){
        return this._position;
    }
    resetPosition(){
        this.position = null;
    }

}