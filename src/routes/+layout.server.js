import { config } from '$lib/config';
import { uniqueId } from '$lib/helpers.js';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ cookies }) {
    
    let userId = cookies.get('userId') || uniqueId();
    
    cookies.set('userId', userId, {
        path: '/',
        maxAge: config.rememberUsers
    });

    return {
        userId
    };
}