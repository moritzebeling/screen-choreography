import { Server } from 'socket.io';

import { uniqueId } from './helpers.js';
import { Users } from './Users.js';

export function socketServer( server ){

    const io = new Server(server);
    console.log('SocketIO injected');

    let users = new Users();

    /*
    io = server or all clients
    socket = client
    */

    io.on('connection', (socket) => {

        socket.emit('testLog', 'Hello, World 👋');

        socket.data.userId = uniqueId();

        socket.on('connectUser', (user) => {    
            users.add( socket.data.userId );
            if( user.mobile ){
                users.add( socket.data.userId, 'mobile' );
            }
            socket.emit('userUpdated', {
                id: socket.data.userId,
                num: users.getPosition( socket.data.userId )
            });
            io.emit('usersUpdated', users.stats);
        });

        socket.on('reorderUser', async () => {
            users.order( socket.data.userId );
            const sockets = await io.fetchSockets();
            for (const s of sockets) {
                s.emit('userUpdated', {
                    id: s.data.userId,
                    num: users.getPosition( s.data.userId )
                });
            }
            io.emit('usersUpdated', users.stats);
        });

        socket.on("disconnect", async () => {
            users.remove( socket.data.userId, 'all' );
            const sockets = await io.fetchSockets();
            for (const s of sockets) {
                s.emit('userUpdated', {
                    id: s.data.userId,
                    num: users.getPosition( s.data.userId )
                });
            }
            io.emit('usersUpdated', users.stats);
        });

        socket.on('setScene', (scene) => {
            io.emit('sceneSet', scene);
        });
        
        socket.on('fingerDown', () => {
            users.add( socket.data.userId, 'pressed' );
            io.emit('usersUpdated', users.stats);
        });
        socket.on('fingerUp', () => {
            users.remove( socket.data.userId, 'pressed' );
            io.emit('usersUpdated', users.stats);
        });
        
        socket.on('refresh', () => {
            io.emit('refresh');
            users.reset();
        });

    });

}