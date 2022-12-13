import { sveltekit } from '@sveltejs/kit/vite';
import { socketServer } from './socket.js';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		{
			name: 'sveltekit-socket-io',
			configureServer(server) {
				socketServer(server);
			}
		}
	]
};

export default config;
