<script>
    
    import Renderer from "../_render/Renderer2.svelte";
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
        add();
        socket.on('scene:updated',data => {
            performanceStore.set( data );
            console.log('scene:updated',$performanceStore);
        });
    });

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
        height: var(--100vh);
    }

    .user {
        overflow: hidden;
        position: relative;
    }
    
</style>