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

    /*
    io = server or all clients
    socket = client
    */

    io.on('connection', (socket) => {

        const userId = uniqueId();

        socket.on('connectUser', () => {    
            if( !allUsers.includes(userId) ){
                allUsers.push(userId);
            }
            io.emit('usersUpdated', {
                ids: allUsers,
                count: allUsers.length
            });
            socket.emit('userUpdated', {
                id: userId,
                num: allUsers.indexOf( userId )
            });
        });

        socket.on('reorderUser', (uId) => {
            allUsers = allUsers.filter((id) => id !== userId);
            allUsers.push(userId);
            socket.emit('userUpdated', {
                id: userId,
                num: allUsers.indexOf( userId )
            });
            io.emit('usersUpdated', {
                ids: allUsers,
                count: allUsers.length
            });
        });

        socket.on('setScene', (scene) => {
            io.emit('sceneSet', scene);
        });

        socket.on("disconnect", (reason) => {
            console.log('disconnect', reason);
            allUsers = allUsers.filter((id) => id !== userId);
            io.emit('usersUpdated', {
                ids: allUsers,
                count: allUsers.length
            });
        });

    });

}