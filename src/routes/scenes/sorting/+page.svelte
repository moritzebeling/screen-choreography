<script>

    import { io } from "$lib/realtime";
    import { onMount } from "svelte";

    let number;

    function handle( event ){
        if( event.code !== 'Space' ) return;
        io.emit("registerDevice");
    }

    onMount(()=>{
        io.on("deviceRegistered", n =>{
            number = n;
        });
    });

</script>

<svelte:window on:keydown|preventDefault={handle} />

<main>
    {#if number}
        <h1>{number}</h1>
    {/if}
</main>

<style>

    main {
        height: var(--100vh);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h1 {
        font-size: 20vw;
    }

</style>