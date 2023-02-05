<script>
    
    import { onMount } from "svelte";
    import { syncAnim } from "$lib/helpers";

    let animating = false;
    onMount(async ()=>{
        animating = await syncAnim( 2000 );
    });

</script>

<main class:animating></main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--100vh);
        transition: opacity 1s ease;
        opacity: 0;
    }
    main.animating {
        opacity: 1;
        animation: colors var(--speed) ease-in-out infinite;
    }

    @keyframes colors {
        0%, 100% {
            background-color:  #f00;
        }
        16.6% {
            background-color:  #ff0;
        }
        33.3% {
            background-color:  #0f0;
        }
        50% {
            background-color:  #0ff;
        }
        66.6% {
            background-color:  #00f;
        }
        83.3% {
            background-color: #f0f;
        }
    }

</style>