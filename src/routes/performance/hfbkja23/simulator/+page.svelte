<script>
    
    import Renderer from "../_render/Renderer.svelte";
    import { socket } from "../socket.js";
    import { onMount } from "svelte";
    import { performanceStore } from "$lib/stores";

    onMount(()=>{
        socket.on('scene:updated',data => {
            performanceStore.set( data );
            console.log('scene:updated',$performanceStore);
        });
    });

    let users = 16;

</script>

<div class="grid">
    {#each Array(users) as _, i}
        <div class="user">
            <Renderer userPosition={i} totalUsers={users} />
        </div>
    {/each}
</div>

<style>

    .grid {
        padding: 1rem;
        gap: 1rem;
        height: var(--100vh);
    }

    .user {
        overflow: hidden;
        position: relative;
    }
    
</style>