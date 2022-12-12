<script>
    
    import { tick } from "$lib/system";
    import { onMount } from "svelte";

    function cssVariables(){
        let vh = window.innerHeight;
        document.documentElement.style.setProperty('--100vh', `${vh}px`);
    }

    onMount(()=>{
        tick();
        cssVariables();
    });
    
</script>

<svelte:window on:resize={cssVariables} />

<slot />
