<script>
    
    import { tick } from "$lib/system";
    import { onMount } from "svelte";

    onMount(()=>{
        tick();
    });
    
</script>

<slot />
