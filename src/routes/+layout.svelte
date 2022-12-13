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
            console.log( 'userUpdated', data );
            user.set( data );
        });
        io.on("usersUpdated", data => {
            console.log( 'usersUpdated', data );
            users.set( data );
        });
        io.on("sceneSet", data => {
            console.log( 'sceneSet', data );
            currentScene.set( data );
        });
    });
    
</script>

<svelte:window on:resize={cssVariables} />

<!-- <slot /> -->

<button on:click={()=> io.emit('reorderUser')}>Reorder</button>
<button on:click={()=> io.emit('setScene','colors')}>Scene</button>

<pre>user {JSON.stringify( $user, true, 4 )}</pre>
<pre>users {JSON.stringify( $users, true, 4 )}</pre>
<pre>scene {JSON.stringify( $currentScene, true, 4 )}</pre>