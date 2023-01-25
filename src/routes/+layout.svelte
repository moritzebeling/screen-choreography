<script>
    
    import { tick } from "$lib/clock";
    import { socketHome as socket } from "$lib/sockets";
    import { onMount } from "svelte";

    function cssVariables(){
        let vh = window.innerHeight;
        document.documentElement.style.setProperty('--100vh', `${vh}px`);
    }

    onMount(()=>{
        tick();
        cssVariables();
        socket.on("rooms:update", data => {
            console.log('List of rooms updated', data);
        });
        socket.on("log", data => {
            console.info( data );
        });
    });
    
</script>

<svelte:window on:resize={cssVariables} />

<slot />