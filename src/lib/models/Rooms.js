import { Room } from "./Room";

export class Rooms {

    constructor(){
        /**
         * @type {Object.<string, Room>}
         */
        this.rooms = {};
    }

    /**
     * Create or enter a new or existing room
     * @param {string} roomId
     * @returns {Room}
     */
    open( roomId ){
        if( !this.exists( roomId ) ){
            this.rooms[ roomId ] = new Room({ id: roomId });
        }
        return this.rooms[ roomId ];
    }

    /**
     * @param {string} roomId
     * @returns {Room}
     */
    get( roomId ){
        return this.rooms[ roomId ];
    } 
    
    /**
     * @param {Room} room
     * @returns {Room}
     */
    update( room ){
        this.rooms[ room.id ] = room;
        return this.rooms[ room.id ];
    }

    /**
     * @param {string} roomId
     * @returns {boolean} - True if room was closed
     */
    close( roomId ){
        if( this.exists( roomId ) ){
            delete this.rooms[ roomId ];
            return true;
        }
        return false;
    }

    /**
     * @param {string} roomId
     * @returns {boolean}
     */
    exists( roomId ){
        return this.rooms.hasOwnProperty( roomId );
    }

}