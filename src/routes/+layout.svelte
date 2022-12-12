<script>
    
    import { tick } from "$lib/system";
    import { onMount } from "svelte";

    onMount(()=>{
        tick();
        let vh = window.innerHeight;
        document.documentElement.style.setProperty('--100vh', `${vh}px`);
    });
    
</script>

<slot />
