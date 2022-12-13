<script>

    import { io, user } from "$lib/realtime";

    let show = false;

    function handle( event ){
        if( event.code !== 'Space' ) return;
        io.emit("reorderUser");
        console.log('reorder');
        io.on("userUpdated", data => {
            show = true;
        });
    }

</script>

<svelte:window on:keydown|preventDefault={handle} />

<main>
    {#if $user !== null && show}
        <h1>{$user.num}</h1>
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