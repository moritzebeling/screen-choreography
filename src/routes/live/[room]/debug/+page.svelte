<script>

    import { PUBLIC_SOCKET } from '$env/static/public';
    import { dev } from '$app/environment';

    import { page } from "$app/stores";
    import Menu from "$lib/Menu.svelte";

    import { duration, seconds, time } from "$lib/clock";
    import { userStore, roomStore, sceneStore } from "$lib/stores";
    import { config } from '$lib/config';

    $: date = {
        time: $time,
        seconds: $seconds,
        timeOnSite: $duration,
    };
    const system = {
        environment: dev ? 'development' : 'production',
        host: PUBLIC_SOCKET
    };

</script>

<main class="layout">

    <div class="text">
        <pre>Date {JSON.stringify(date, null, 4)}</pre>
        <pre>User {JSON.stringify($userStore, null, 4)}</pre>
        <pre>Room {JSON.stringify($roomStore, null, 4)}</pre>
        <pre>Scene {JSON.stringify($sceneStore, null, 4)}</pre>
        <pre>System {JSON.stringify(system, null, 4)}</pre>
    </div>
        
    <Menu>
        <a class="button" href="/live/{$page.params.room}">Close</a>
        <a class="button" href="{config.issues}" target="_blank" rel="noopener nofollow noreferrer">Report bug or suggest feature</a>
    </Menu>

</main>

<style>

    main {
        mix-blend-mode: difference;
    }
    .text {
        flex: 1;
    }
    pre {
        margin: 1rem;
    }

</style>