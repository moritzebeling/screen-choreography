import { config } from '../config.js';
import { slug } from '../helpers.js';

/*
dimensions
- false: no x or y dimension
- {x: true}: x dimension only, as many as given
- {x: 8}: x dimension only, 8 max
- {x: true, y: true}: x and y dimension, each as many as given
- {x: true, y: 2}: x and y dimension, x as many as given, 2 max y
*/

export class Room {

    /**
     * @param {Object} options
     * @param {string?} options.title
     * @param {string?} options.id
     * @param {string?} options.password
     * @param {Date} options.created
     * @param {Date} options.updated
     * @param {Object} options.dimensions
     * @param {Object} options.users - { userId: isAdmin }
     */
    
    constructor( options = {} ){
        this.id = options.id || null;
        this.title = options.title || options.id || null;
        this.password = options.password || null;
        this.created = options.created ? new Date(options.created) : new Date();
        this.updated = options.updated ? new Date(options.updated) : new Date();
        this.dimensions = options.dimensions || false;
        this.users = options.users || {};
    }

    /**
     * @param {string} title 
     * @returns {string}
     */
    static generateIdFromTitle( title ){
        return slug( title );
    }

    /**
     * @param {string} userId
     */
    addUser( userId, asAdmin = false ){
        if( !this.users.hasOwnProperty(userId) ){
            this.users[userId] = asAdmin === true;
        }
    }
    
    /**
     * @param {string} userId
     * @returns {boolean}
     */
    isAdmin( userId ){
        if( this.users.hasOwnProperty(userId) ){
            return this.users[userId] === true;
        }
        return false;
    }

    /**
     * @param {string} userId
     * @returns {Object}
     */
    removeUser( userId ){
        delete this.users[userId];
        return this.users;
    }
    
    /**
     * @returns {Object}
     */
    removeAllUsers(){
        this.users = {};
        return this.users;
    }

    ping(){
        this.updated = new Date();
    }

    /**
     * @returns {boolean}
     */
    isAbandoned(){
        if( this.userIds.length > 0){
            return false;
        }
        if( this.updated.getTime() > (Date.now() - config.settings.keepEmptyRooms) ){
            return false;
        }
        return true;
    }

    get userIds(){
        return Object.keys(this.users);
    }

    get count(){
        return this.userIds.length;
    }

}