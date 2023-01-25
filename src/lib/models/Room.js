import { slug } from '../helpers';
import { Users } from './Users';

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
     * @param {string} options.id
     * @param {string?} options.password
     * @param {Date} options.dateOpened
     * @param {Date} options.dateLastUpdated
     * @param {Object} options.dimensions
     * @param {string[]} options.users - A list of user ids
     */
    
    constructor( options ){
        this.id = options.id;
        this.title = options.title || null;
        this.password = options.password || null;
        this.dateOpened = new Date( options.dateOpened || undefined );
        this.dateLastUpdated = new Date( options.dateLastUpdated || undefined );
        this.dimensions = options.dimensions || false;
        this.users = options.users || [];
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
    addUser( userId ){
        if( !this.users.includes( userId ) ){
            this.users.push( userId );
        }
    }

    /**
     * @param {string} userId
     * @returns {string[]}
     */
    removeUser( userId ){
        this.users = this.users.filter( id => id !== userId );
        return this.users;
    }
    
    /**
     * @returns {string[]}
     */
    removeAllUsers(){
        this.users = [];
        return this.users;
    }

    get count(){
        return this.users.length;
    }

}