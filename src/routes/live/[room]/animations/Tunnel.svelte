<script>

    import { onMount } from "svelte";
    import { syncAnim } from "$lib/helpers";

    let animating = false;
    onMount(async ()=>{
        animating = await syncAnim( 2000 );
    });

</script>

<main class:animating>
    <div></div>
    <div></div>
</main>

<style>

    main div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vw;
        top: calc( 50vh - 50vw );
    }
    main {
        transition: opacity 1s ease;
        opacity: 0;
    }
    main.animating {
        opacity: 1;
    }
    @media (orientation: portrait) {
        main div {
            width: 100vh;
            height: 100vh;
            top: 0;
            left: calc( 50vw - 50vh );
        }
    }
    main.animating div {
        background-color: var(--color);
        transition: background-color var(--speed) ease-in-out;
        animation: tunnel var(--speed) ease-in;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        z-index: 1;
        border-radius: 100%;
    }
    main.animating div + div {
        background-color: var(--background);
        animation-delay: calc( var(--speed) / 2 );
    }

    @keyframes tunnel {
        0%, 100% {
            transform: scale(2);
            z-index: 1;
        }
        1%, 49% {
            opacity: 1;
            z-index: 2;
        }
        50% {
            transform: scale(0);
            opacity: 0;
            z-index: 1;
        }
        51% {
            transform: scale(2);
        }
        80% {
            opacity: 1;
        }
    }

</style>