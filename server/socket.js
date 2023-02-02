import { Server } from 'socket.io';
import { parse as parseCookie } from "cookie";

import { Rooms } from '../src/lib/models/Rooms.js';

let rooms = new Rooms();

function readUserIdFromCookie( cookies = '', key = 'userId' ){
    cookies = parseCookie( '' + cookies );
    return cookies[key] || false;
}

export function socketServer( server ){

    const io = new Server(server,{
        cookie: true
    });
    console.log('io', 'server started');

    /*
    io = server or all clients
    socket = client
    */
    
    io.of('/home').on('connection', (socket) => {

        console.log('io/home', 'connection', socket.data);
        socket.emit('log', 'io/home Successfully connected');
        socket.emit('rooms:update', rooms.list );

    });
    
    io.of('/live').on('connection', (socket) => {
        
        let userId = readUserIdFromCookie( socket.handshake.headers.cookie );
        if( userId ){
            socket.data.userId = userId;
        }

        console.log('io/live', 'connection', socket.data);
        socket.emit('log', 'io/live Successfully connected');
        socket.emit('room:reenter');

        socket.on('room:create', ({ id, password, title }) => {
            if( rooms.allowedToCreate( id ) ){

                let room = rooms.open({ id, password, title }, true);
                room.addUser( socket.data.userId, true );
                
                console.log('io/live', 'room:created', room.id, socket.data);

                socket.emit('room:created', room);
                io.of('/home').emit('rooms:update', rooms.list );

            } else {
                socket.emit('room:exists');
            }
        });

        socket.on('room:enter', ({ id }) => {

            let room = rooms.open({ id: id });
            room.addUser( socket.data.userId );

            socket.data.roomId = room.id;
            socket.join( room.id );
            
            console.log('io/live', 'room:enter', socket.data);
            
            io.of('/live').to( room.id ).emit('room:update', room );
            io.of('/home').emit('rooms:update', rooms.list );

        });

        socket.on('disconnect', () => {
            
            if( socket.data.roomId && socket.data.userId ){
                let room = rooms.get( socket.data.roomId );
                if( room ){
                    room.removeUser( socket.data.userId );
                    io.of('/live').to( room.id ).emit('room:update', room );
                }
            }
            console.log('io/live', 'disconnect', socket.data );
            
            rooms.purge();
            io.of('/home').emit('rooms:update', rooms.list );
        
        });

        socket.on('room:leave', () => {

            if( socket.data.roomId && socket.data.userId ){
                let room = rooms.get( socket.data.roomId );
                if( room ){
                    room.removeUser( socket.data.userId );
                    io.of('/live').to( room.id ).emit('room:update', room );
                }
                socket.leave( socket.data.roomId );
                console.log('io/live', 'room:leave', socket.data );
            }
            socket.data.roomId = null;
            
            rooms.purge();
            io.of('/home').emit('rooms:update', rooms.list );
             
        });
        
        socket.on('room:update', ({room}) => {

            if( !rooms.isAdmin( socket.data.roomId, socket.data.userId ) ){
                return;
            }

            rooms.update( room );
            console.log('io/live', 'room:update', socket.data.roomId );

            io.of('/live').to( socket.data.roomId ).emit('room:update', room);
            
        });
        
        socket.on('scene:update', scene => {

            if( !rooms.isAdmin( socket.data.roomId, socket.data.userId ) ){
                return;
            }

            /*
            @todo:
            - check if update is not too old
            - should scene be saved to room?
            */

            console.log('io/live', 'scene:update', socket.data.roomId );

            io.of('/live').to( socket.data.roomId ).emit('scene:update', scene);
            
        });
        
        socket.on('refresh', () => {

            if( !rooms.isAdmin( socket.data.roomId, socket.data.userId ) ){
                return;
            }
            
            rooms.get( socket.data.roomId ).removeAllUsers();
            rooms.close( socket.data.roomId );

            socket.data.userId = null;
            socket.data.roomId = null;

            io.of('/live').to( socket.data.roomId ).emit('refresh');

        });

        socket.on('log', data => {

            console.info('io/live', 'log', data );
            io.of('/live').to( socket.data.roomId ).emit('log', data);

        });

    });












    // let users = new Users();

    // io.of('/performance').on('connection', (socket) => {

    //     socket.emit('testLog', 'Hello, World 👋');

    //     socket.data.userId = uniqueId();

    //     socket.on('connectUser', (user) => {    
    //         users.add( socket.data.userId );
    //         if( user.mobile ){
    //             users.add( socket.data.userId, 'mobile' );
    //         }
    //         socket.emit('userUpdated', {
    //             id: socket.data.userId,
    //             num: users.getPosition( socket.data.userId )
    //         });
    //         io.emit('usersUpdated', users.stats);
    //     });

    //     socket.on('reorderUser', async () => {
    //         users.order( socket.data.userId );
    //         const sockets = await io.fetchSockets();
    //         for (const s of sockets) {
    //             s.emit('userUpdated', {
    //                 id: s.data.userId,
    //                 num: users.getPosition( s.data.userId )
    //             });
    //         }
    //         io.emit('usersUpdated', users.stats);
    //     });

    //     socket.on('disconnect', async () => {
    //         users.remove( socket.data.userId, 'all' );
    //         const sockets = await io.fetchSockets();
    //         for (const s of sockets) {
    //             s.emit('userUpdated', {
    //                 id: s.data.userId,
    //                 num: users.getPosition( s.data.userId )
    //             });
    //         }
    //         io.emit('usersUpdated', users.stats);
    //     });

    //     socket.on('setScene', (scene) => {
    //         io.emit('sceneSet', scene);
    //     });
        
    //     socket.on('fingerDown', () => {
    //         users.add( socket.data.userId, 'pressed' );
    //         io.emit('usersUpdated', users.stats);
    //     });
    //     socket.on('fingerUp', () => {
    //         users.remove( socket.data.userId, 'pressed' );
    //         io.emit('usersUpdated', users.stats);
    //     });

    //     socket.on('updateScene', ( data ) => {
    //         io.emit('updateScene', data);
    //     });
        
    //     socket.on('refresh', () => {
    //         io.emit('refresh');
    //         users.reset();
    //     });

    // });

}