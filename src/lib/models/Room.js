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
     * @param {Array<string>} options.users
     * @param {Array<string>} options.admins
     */
    
    constructor( options = {} ){
        this.id = options.id || null;
        this.title = options.title || options.id || null;
        this.password = options.password || null;
        this.created = options.created ? new Date(options.created) : new Date();
        this.updated = options.updated ? new Date(options.updated) : new Date();
        this.dimensions = options.dimensions || false;
        this.users = options.users || [];
        this.admins = options.admins || [];
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
        if( !this.users.includes(userId) ){
            this.users.push( userId );
        }
        if( asAdmin === true && !this.admins.includes(userId) ){
            this.admins.push( userId );
        }
    }
    
    /**
     * @param {string} userId
     * @returns {boolean}
     */
    isAdmin( userId ){
        return this.admins.includes(userId);
    }
    
    /**
     * @param {string} userId
     * @returns {boolean}
     */
    allowedToTakeover( userId ){
        if( this.users.length === 0 || this.admins.length === 0 ){
            return true;
        }
        if( !this.password ){
            return true;
        }
        return this.isAdmin( userId );
    }

    /**
     * @param {string} userId
     * @returns {Object}
     */
    removeUser( userId ){
        this.users = this.users.filter( uid => uid !== userId );
        return this.users;
    }
    
    /**
     * @returns {Object}
     */
    removeAllUsers(){
        this.users = [];
        return this.users;
    }

    ping(){
        this.updated = new Date();
    }

    /**
     * @returns {boolean}
     */
    isAbandoned(){
        if( this.users.length > 0){
            return false;
        }
        if( this.updated.getTime() > (Date.now() - config.settings.keepEmptyRooms) ){
            return false;
        }
        return true;
    }

    json( obfuscate = true ){
        let password = this.password;
        if( password && obfuscate === true ){
            password = new Array(password.length + 1).join('•');
        }
        return JSON.stringify({
            id: this.id,
            title: this.title,
            password,
            created: this.created,
            updated: this.updated,
            dimensions: this.dimensions,
            users: this.users,
            admins: this.admins
        }, null, 4);
    }

    url( sub = '', host = '' ){
        let url = `${host}/live/${this.id}`;
        if( sub ){
            url += '/' + sub;
        }
        return url;
    }

}