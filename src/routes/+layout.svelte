<script>
    
    import { tick } from "$lib/clock";
    import Meta from "$lib/Meta.svelte";
    import { onMount } from "svelte";
    import { userStore } from "$lib/stores";
    import { User } from "$lib/models/User";

    function cssVariables(){
        let vh = window.innerHeight;
        document.documentElement.style.setProperty('--100vh', `${vh}px`);
    }

    /** @type {import('./$types').LayoutServerData} */
    export let data;

    onMount(()=>{

        let user = new User(data.user);
        user.detectTouch();
        userStore.set( user );

        tick();
        cssVariables();
        
    });
    
</script>

<svelte:window on:resize={cssVariables} />

<Meta />

<slot />