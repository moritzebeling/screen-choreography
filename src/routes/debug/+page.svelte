<script>

    import { PUBLIC_SOCKET } from '$env/static/public';
    import { dev } from '$app/environment';

    import DebugView from '$lib/debug/DebugView.svelte';

    import { userStore } from "$lib/stores";
    import { config } from '$lib/config';
    import { socket } from "../socket.js";
    import { onMount } from "svelte";

    const system = {
        environment: dev ? 'development' : 'production',
        host: PUBLIC_SOCKET
    };

    let rooms = [];

    onMount(()=>{
        socket.on('rooms:update', data => {
            rooms = data;
        });
        socket.on('log', data => {
            console.info( data );
        });
        return () => {
            socket.off('rooms:update');
            socket.close();
        }
    });

</script>

<svelte:head>
    <title>{config.title} (Debug)</title>
</svelte:head>

<DebugView>

    <pre>User {JSON.stringify($userStore, null, 4)}</pre>
    <pre>Rooms {JSON.stringify(rooms, null, 4)}</pre>
    <pre>System {JSON.stringify(system, null, 4)}</pre>

</DebugView>

<style>
</style>