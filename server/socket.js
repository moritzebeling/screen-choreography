import { Server } from 'socket.io';
import { parse as parseCookie } from "cookie";

import { User } from '../src/lib/models/User.js';
import { Rooms } from '../src/lib/models/Rooms.js';

let rooms = new Rooms();

function readUserIdFromCookie( cookies = '' ){
    cookies = parseCookie( '' + cookies );
    return cookies?.userId || false;
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

        console.log('io/home', 'connection');
        socket.emit('log', 'io/home Successfully connected');
        io.of('/home').emit('rooms:update', rooms.activeList );

    });
    
    io.of('/live').on('connection', (socket) => {
        
        console.log('io/live', 'connection');
        socket.emit('log', 'io/live Successfully connected');

        /*
        todo
        can the user object be created here?
        */

        socket.on('room:create', ({ roomId, password, title }) => {
            if( rooms.allowedToCreate( roomId ) ){
                let room = rooms.open({ id: roomId, password, title }, true);
                socket.emit('room:created', room);
                /*
                todo
                - save password to user object
                - add user to room
                */
            } else {
                let room = rooms.get( roomId );
                socket.emit('room:exists', room );
            }
        });

        socket.on('room:enter', ({ roomId, device }) => {

            // user
            let user = new User({
                id: readUserIdFromCookie( socket.handshake.headers.cookie ),
                ...device
            });
            socket.data.user = user;
            
            // room @todo
            let room = rooms.open({ id: roomId });
            room.addUser( user.id );
            socket.data.roomId = room.id;
            socket.join( room.id );
            
            console.log('io/live', 'room:enter', room.id, user.id);
            
            socket.emit('user:update', socket.data.user );
            io.of('/live').to( room.id ).emit('room:update', room );
            io.of('/home').emit('rooms:update', rooms.activeList );

        });

        socket.on('disconnect', () => {
            
            let room = rooms.get( socket.data.roomId );
            if( room ){
                room.removeUser( socket.data.user.id );
                io.of('/live').to( room.id ).emit('room:update', room );
            }
            rooms.purge();

            socket.leave( socket.data.roomId );
            socket.data.roomId = null;

            io.of('/home').emit('rooms:update', rooms.activeList );
        
        });

        socket.on('room:leave', () => {

            let room = rooms.get( socket.data.roomId );
            if( room ){
                room.removeUser( socket.data.user.id );
                io.of('/live').to( room.id ).emit('room:update', room );
            }
            rooms.purge();

            socket.leave( socket.data.roomId );
            socket.data.roomId = null;

            io.of('/home').emit('rooms:update', rooms.activeList );
             
        });
        
        socket.on('room:update', ({room}) => {

            // check password
            room = rooms.update( room );
            io.of('/live').to( socket.data.roomId ).emit('room:update', room);
            
        });
        
        socket.on('scene:update', scene => {

            rooms.get( socket.data.roomId );
            // check password
            console.log('io/live', 'scene:update', socket.data.roomId );
            io.of('/live').to( socket.data.roomId ).emit('scene:update', scene);
            
        });
        
        socket.on('refresh', () => {
            
            // check password
            rooms.get( socket.data.roomId ).removeAllUsers();
            rooms.close( socket.data.roomId );

            socket.data.user = null;
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