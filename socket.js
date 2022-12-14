import { Server } from 'socket.io';

export function uniqueId(length = 16) {
	let result = '';
	let budget = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var max = budget.length;
	for ( var i = 0; i < length; i++ ) {
		result += budget.charAt( Math.floor(Math.random() * max) );
	}
	return result;
}

class Users {
    reset(){
        this.total = [];
        this.ordered = [];
        this.mobile = [];
        this.pressed = [];
    }
    constructor(){
        this.reset();
    }
    get stats(){
        return {
            total: this.total.length,
            ordered: this.ordered.length,
            mobile: this.mobile.length,
            pressed: this.pressed.length
        }
    }
    add(id, list = 'total'){
        if( !this[list].includes(id) ){
            this[list].push(id);
        }
    }
    remove(id, list = 'total'){
        if( list === 'all' ){
            this.total = this.total.filter((i) => i !== id);
            this.ordered = this.ordered.filter((i) => i !== id);
            this.mobile = this.mobile.filter((i) => i !== id);
            this.pressed = this.pressed.filter((i) => i !== id);
        } else {
            this[list] = this[list].filter((i) => i !== id);
        }
    }
    order(id, list = 'ordered'){
        this.remove(id,list);
        this.add(id,list);
    }
    getPosition(id){
        let order = 0;
        if( this.ordered.length > 0 ){
            order = this.ordered.indexOf(id);
        } else {
            order = this.total.indexOf(id);
        }
        return Math.max( 0, order );
    }
}

export function socketServer( server ){

    const io = new Server(server.httpServer);
    console.log('SocketIO injected');

    let users = new Users();

    /*
    io = server or all clients
    socket = client
    */

    io.on('connection', (socket) => {

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