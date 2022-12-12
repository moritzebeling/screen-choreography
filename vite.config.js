import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from 'socket.io';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		{
			name: 'sveltekit-socket-io',
			configureServer(server) {

				const io = new Server(server.httpServer);
				// Socket.IO stuff goes here
				console.log('SocketIO injected');

				// This is located in the svelte config (see above "Socket.IO stuff goes here")
				io.on('connection', (socket) => {
					// Generate a random username and send it to the client to display it
					let username = `User ${Math.round(Math.random() * 999999)}`;
					socket.emit('name', username);

					// Receive incoming messages and broadcast them
					socket.on('setScene', (scene) => {
						io.emit('setScene', scene);
					});
				});


			}
		}
	]
};

export default config;
