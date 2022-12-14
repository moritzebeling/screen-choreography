<script>

    import { fade } from "svelte/transition";
    import { seconds } from "$lib/clock";
    import { user } from "$lib/realtime";

    let animating = false;
    let alternated = $user.num % 2 === 0;

    function switchTarget( s ){
        if( s % 4 === 0 ){
            animating = true;
        }
    }

    $: switchTarget( $seconds );

    /*
    @todo insert qr code
    https://lmy.de/iu6N4
    */

</script>

<svelte:window on:click={() => alternated = true } />

{#if animating}
    <main transition:fade>
        <figure class:animating class:alternated>
            <img src="/qr.png" />
        </figure>
        <figure class="caption" class:animating class:alternated>
            <figcaption>https://lmy.de/iu6N4</figcaption>
        </figure>
    </main>
{/if}

<style>
    
    figure {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--100vh);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img {
        width: 50vh;
        height: 50vh;
    }
    figure.animating {
        animation: swiping 8s linear infinite;
        animation-fill-mode: both;
    }
    figure.alternated {
        animation-delay: 4s;
    }
    .caption {
        animation-delay: 4s !important;
        font-size: 3rem;
    }
    .caption.alternated {
        animation-delay: 0s !important;
    }

    @keyframes swiping {
        0% {
            transform: translateX(-100vw);
        }
        /* 10%, 40% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(100vw);
        } */
        100% {
            transform: translateX(100vw);
        }
    }

</style>