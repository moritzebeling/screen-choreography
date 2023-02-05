<script>

    import { onMount } from "svelte";
    import { syncAnim } from "$lib/helpers";

    let animating = false;
    onMount(async ()=>{
        animating = await syncAnim( 2000 );
    });

    /**
     * @param {Object} options
     * @param {number} options.radius - Border radius in percent
     */
     export let options = {
        radius: 1
    };

</script>

<main class:animating style="--radius: {options.radius*100}%;">
    <div style="--delay: 0ms;"></div>
    <div style="--delay: calc( var(--speed) * 0.1 ) ;"></div>
    <div style="--delay: calc( var(--speed) * 0.2 ) ;"></div>
    <div style="--delay: calc( var(--speed) * 0.3 ) ;"></div>
    <div style="--delay: calc( var(--speed) * 0.4 ) ;"></div>
    <div style="--delay: calc( var(--speed) * 0.5 ) ;"></div>
    <div style="--delay: calc( var(--speed) * 0.6 ) ;"></div>
    <div style="--delay: calc( var(--speed) * 0.7 ) ;"></div>
    <div style="--delay: calc( var(--speed) * 0.8 ) ;"></div>
    <div style="--delay: calc( var(--speed) * 0.9 ) ;"></div>
</main>

<style>

    main {
        transition: opacity 1s ease;
        opacity: 0;
    }
    main.animating {
        opacity: 1;
    }
    main div {
        position: fixed;
        left: 0;
        width: 100vw;
        height: 100vw;
        top: calc( 50vh - 50vw );
    }
    main.animating div {
        background-color: var(--color);
        transition: background-color var(--speed) ease-in-out;
        animation: unfold var(--speed) ease-in;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        animation-delay: var(--delay);
        border-radius: var(--radius);
    }

    @keyframes unfold {
        0% {
            transform: scale(2);
            opacity: 0;
        }
        20% {
            opacity: 0;
        }
        70% {
            opacity: 0.2;
        }
        95% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }

</style>