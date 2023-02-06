import { dev } from '$app/environment';
import { uniqueId } from '$lib/helpers.js';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ cookies }) {

    let cookieName = 'hfbkja23';
    let userId = cookies.get(cookieName) || uniqueId();
    
    cookies.set(cookieName, userId, {
        path: '/',
        maxAge: 60,
        secure: !dev
    });

    return { userId };
}