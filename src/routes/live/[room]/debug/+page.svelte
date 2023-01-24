<script>

    import { PUBLIC_SOCKET } from '$env/static/public';
    import { dev } from '$app/environment';

    import { page } from "$app/stores";
    import Menu from "$lib/Menu.svelte";

    import { duration, seconds, time } from "$lib/clock";
    import { currentScene } from "$lib/control";
    import { user, users } from "$lib/realtime";
    import { config } from '$lib/config';

    $: data = {
        date: {
            time: $time,
            seconds: $seconds,
            timeOnSite: $duration,
        },
        user: {
            id: $user.id,
            orderInRoom: $user.num,
            isTouch: 'unknown', // todo
        },
        room: {
            connected: 'unknown', // todo
            id: $currentScene,
            totalUsers: $users.total,
        },
        system: {
            host: PUBLIC_SOCKET,
            environment: dev ? 'development' : 'production',
        }
    };

</script>

<main class="layout">

    <div class="text">
        <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
        
    <Menu>
        <a class="button" href="/live/{$page.params.room}">Close</a>
        <a class="button" href="{config.issues}" target="_blank" rel="noopener nofollow noreferrer">Report bug or suggest feature</a>
    </Menu>

</main>

<style>

    .text {
        padding: 1rem;
        flex: 1;
    }

</style>