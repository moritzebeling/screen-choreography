import { dev } from '$app/environment';
import { config } from '$lib/config';
import { uniqueId } from '$lib/helpers.js';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ cookies }) {

    let cookieName = 'hfbkja23';
    let guestId = cookies.get(cookieName) || uniqueId();
    
    cookies.set(cookieName, guestId, {
        path: '/performance/hfbkja23',
        maxAge: config.settings.rememberUsers,
        secure: !dev
    });

    return { guestId };
}