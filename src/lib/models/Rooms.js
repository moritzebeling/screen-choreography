import { Room } from "./Room.js";

export class Rooms {

    constructor(){
        /**
         * @type {Object.<string, Room>}
         */
        this.rooms = {};
    }

    /**
     * Create or enter a new or existing room
     * @param {Room|object} room
     * @returns {Room|false}
     */
    open( room, override = false ){

        if( override === true || !this.exists( room.id ) ) {
            room = new Room( room );
        } else {
            room = this.rooms[ room.id ];
        }

        this.rooms[ room.id ] = room;
        room.ping();

        return room;
    }

    /**
     * @param {string} roomId
     * @returns {Room | false}
     */
    get( roomId ){
        if( !this.exists( roomId ) ){
            return false;
        }
        let room = this.rooms[ roomId ];
        if( room ){
            room.ping();
        }
        return room;
    } 
    
    /**
     * @param {Room} room
     * @returns {Room}
     */
    update( room ){
        this.rooms[ room.id ] = new Room( room );
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

    /**
     * @param {string} roomId
     * @returns {boolean}
     */
    allowedToCreate( roomId ){
        let room = this.get( roomId );
        if( !room || room.isAbandoned() ){
            return true;
        }
        return false;
    }
    
    /**
     * @param {string} roomId
     * @param {string} userId
     * @returns {boolean}
     */
    isAdmin( roomId, userId ){
        let room = this.get( roomId );
        if( !room ){
            return false;
        }
        return room.isAdmin( userId );
    }
    
    /**
     * @param {string} roomId
     * @param {string} userId
     * @returns {boolean}
     */
    allowedToTakeover( roomId, userId ){
        let room = this.get( roomId );
        if( !room ){
            return false;
        }
        return room.allowedToTakeover( userId );
    }

    purge(){
        for( let room of Object.values( this.rooms ) ){
            if( room.isAbandoned() ){
                this.close( room.id );
            }
        }
    }

    get list(){
        return Object.values( this.rooms );
    }

}