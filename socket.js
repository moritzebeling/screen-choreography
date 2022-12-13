import { Server } from 'socket.io';

export function uniqueId(length = 4) {
	let result = '';
	let budget = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var max = budget.length;
	for ( var i = 0; i < length; i++ ) {
		result += budget.charAt( Math.floor(Math.random() * max) );
	}
	return result;
}

export function socketServer( server ){

    const io = new Server(server.httpServer);
    console.log('SocketIO injected');

    let allUsers = [];
    let allUsersSorted = [];

    /*
    io = server or all clients
    socket = client
    */

    io.on('connection', (socket) => {

        /*
        a new client is connected
        */

        socket.data.userId = uniqueId();

        socket.on('connectUser', () => {    
            /*
            that new client sent a `connectUser` event
            */
            if( !allUsers.includes(socket.data.userId) ){
                allUsers.push(socket.data.userId);
            }
            /*
            return a user object and update all other clients with the new users list
            */
            socket.emit('userUpdated', {
                id: socket.data.userId,
                num: allUsers.indexOf( socket.data.userId )
            });
            io.emit('usersUpdated', allUsers.length );
        });

        socket.on('reorderUser', async (uId) => {
            allUsers = allUsers.filter((id) => id !== socket.data.userId);
            allUsers.push(socket.data.userId);
            allUsersSorted = allUsersSorted.filter((id) => id !== socket.data.userId);
            allUsersSorted.push(socket.data.userId);
            const sockets = await io.fetchSockets();
            for (const s of sockets) {
                s.emit('userUpdated', {
                    id: s.data.userId,
                    // num: allUsers.indexOf( s.data.userId )
                    num: allUsersSorted.indexOf( s.data.userId )
                });
            }
            io.emit('usersUpdated', allUsers.length );
        });

        socket.on("disconnect", async (reason) => {
            console.log('disconnect', reason);
            allUsers = allUsers.filter((id) => id !== socket.data.userId);
            allUsersSorted = allUsersSorted.filter((id) => id !== socket.data.userId);
            const sockets = await io.fetchSockets();
            for (const s of sockets) {
                s.emit('userUpdated', {
                    id: s.data.userId,
                    num: allUsers.indexOf( s.data.userId )
                });
            }
        });

        socket.on('setScene', (scene) => {
            io.emit('sceneSet', scene);
        });

    });

}