<script>
    
    import Renderer from "../_render/Renderer.svelte";
    import { socket } from "../socket.js";
    import { onMount } from "svelte";
    import { performanceStore } from "$lib/stores";

    let users = 1;

    function add(){
        if( users < 16 ){
            users++;
            setTimeout(() => {
                add();
            }, 57 );
        }
    }

    onMount(()=>{
        socket.emit('room:leave');
        socket.emit('room:join');
        add();
        socket.on('scene:update',data => {
            performanceStore.set( data );
            console.log('scene:update',$performanceStore);
        });
    });

</script>

<div class="grid">
    {#each Array(users) as _, i}
        <div class="user">
            <pre>{i} / {users}</pre>
            <Renderer userPosition={i} totalUsers={users} />
        </div>
    {/each}
</div>

<style>

    .grid {
        height: var(--100vh);
    }

    .user {
        overflow: hidden;
        position: relative;
    }

    pre {
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;
        color: white;
        mix-blend-mode: difference;
        padding: 1rem;
    }
    
</style>