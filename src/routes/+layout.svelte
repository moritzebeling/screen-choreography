<script>
    
    import { tick } from "$lib/clock";
    import { onMount } from "svelte";
    import { io } from "$lib/realtime";
    import { currentScene } from "$lib/control";

    function cssVariables(){
        let vh = window.innerHeight;
        document.documentElement.style.setProperty('--100vh', `${vh}px`);
    }

    onMount(()=>{
        tick();
        cssVariables();

        io.on("setScene", scene => {
            currentScene.set( scene );
        })
    });
    
</script>

<svelte:window on:resize={cssVariables} />

<slot />
