<script>
    
    import { tick } from "$lib/clock";
    import { onMount } from "svelte";
    import { io, user, users } from "$lib/realtime";
    import { currentScene } from "$lib/control";

    function cssVariables(){
        let vh = window.innerHeight;
        document.documentElement.style.setProperty('--100vh', `${vh}px`);
    }

    onMount(()=>{
        tick();
        cssVariables();
        io.emit("connectUser");
        io.on("userUpdated", data => {
            user.set( data );
        });
        io.on("usersUpdated", data => {
            users.set( data );
        });
        io.on("sceneSet", data => {
            currentScene.set( data );
        });
    });
    
</script>

<svelte:window on:resize={cssVariables} />

<!-- <slot /> -->

<button on:click={()=> io.emit('reorderUser')}>Reorder</button>
<button on:click={()=> io.emit('setScene','colors')}>Scene</button>

<pre>user {JSON.stringify( $user )}</pre>
<pre>users {JSON.stringify( $users )}</pre>
<pre>scene {JSON.stringify( $currentScene )}</pre>

<h1>{$user.num}</h1>

<style>
    h1 {
        font-size: 8rem;
    }
</style>