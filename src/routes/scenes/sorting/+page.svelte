<script>

    export let number = 1;
    export let success = false;

    function handle( event ){
        if( event.code !== 'Space' ) return;
        // @todo actually count devices
        console.log('register device', event);
        success = true;
    }

</script>

<svelte:window on:keydown|preventDefault={handle} />

<main>
    {#if success}
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