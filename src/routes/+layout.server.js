import { config } from '$lib/config';
import { uniqueId } from '$lib/helpers.js';
import { Device } from '$lib/models/Device';
import { User } from '$lib/models/User';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ cookies, request }) {

    let device = new Device(
        request.headers.get('user-agent'),
        request.headers.get('accept-language')
    );

    let user = {
        id: cookies.get('userId') || uniqueId(),
        ...device
    };
    
    cookies.set('userId', user.id, {
        path: '/',
        maxAge: config.settings.rememberUsers
    });

    return { user };
}