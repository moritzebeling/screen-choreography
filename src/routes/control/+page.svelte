<script>
    
    import { scenes } from "$lib/control";
    import ControlButton from "$lib/ControlButton.svelte";
    import { io } from "$lib/realtime";

</script>

<nav>
    {#each scenes as scene, i}
        <ControlButton {scene} />
    {/each}
    <button on:click={()=>io.emit("refresh")}>Refresh</button>
</nav>

<style>

    nav {
        padding: 1rem;
        width: 100vw;
        height: var(--100vh);
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 1.5rem;
    }

    nav :global( button ){
        margin: 0.3rem;
    }

</style>