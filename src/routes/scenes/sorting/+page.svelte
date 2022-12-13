<script>

    import { fade } from "svelte/transition";
    import { io, user } from "$lib/realtime";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let show = false;

    function handle( event ){
        if( event.code !== 'Space' ) return;
        io.emit("reorderUser");
        console.log('reorder');
        io.on("userUpdated", data => {
            show = true;
            setTimeout(()=>{
                dispatch('continue');
            }, 5000);
        });
    }

</script>

<svelte:window on:keydown|preventDefault={handle} />

<main>
    {#if $user !== null && show}
        <div>
            <h1 in:fade>{$user.num}</h1>
        </div>
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
        animation: fadeOut 3s ease-in-out;
        animation-delay: 1s;
        animation-fill-mode: both;
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

</style>