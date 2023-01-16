import { sveltekit } from '@sveltejs/kit/vite';
import { socketServer } from './server/socket.js';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		{
			name: 'sveltekit-socket-io',
			configureServer(server) {
				socketServer(server.httpServer);
			}
		}
	],
	server: {
		port: 3000,
		strictPort: false,
	},
	preview: {
		port: 3000,
		strictPort: false,
	}
};

export default config;
