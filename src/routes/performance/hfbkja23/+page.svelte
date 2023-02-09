<script>

    import { socket } from "./socket.js";
    import { onMount } from "svelte";
    import { userStore, roomStore, performanceStore } from "$lib/stores";
    import Renderer from "./_render/Renderer.svelte";

    onMount(()=>{
        socket.emit('room:enter');
        socket.on('scene:update', data => {
            performanceStore.set( data );
            console.log('scene:update',$performanceStore);
        });
        socket.on('room:reset', () => {
            let timeout = 100 + (($userStore.position || 0) * 100);
            setTimeout(()=>{
                socket.emit('room:enter');
            }, timeout);
        });
    });

</script>

<!-- <pre>Scene {JSON.stringify($performanceStore, true, 2)}</pre>
<pre>Room {JSON.stringify($roomStore, true, 2)}</pre>
<pre>User {JSON.stringify($userStore, true, 2)}</pre> -->

<pre>{$userStore.position} / {$roomStore.users.length}</pre>

<Renderer userPosition={$userStore.position} totalUsers={$roomStore.users.length} />

<style>
    pre {
        margin: 1rem;
        color: white;
        mix-blend-mode: difference;
    }
</style>