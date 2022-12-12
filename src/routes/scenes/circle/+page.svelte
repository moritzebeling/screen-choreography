<script>

    import { seconds } from "$lib/clock";

    let animating = false;
    let alternated = false;

    function switchTarget( s ){
        if( s % 5 === 0 ){
            animating = true;
        }
    }

    $: switchTarget( $seconds );

    /*
    @todo ever seconds screen needs to be alternated
    */

</script>

<svelte:window on:click={() => alternated = true } />

<main class:animating class:alternated></main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
    }
    main.animating {
        animation: slide 2s linear;
        animation-iteration-count: infinite;
        background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%);
    }
    main.animating.alternated {
        animation-delay: 1s;
    }

    @keyframes slide {
        from {
            transform: translateX(-100vw);
        }
        to {
            transform: translateX(100vw);
        }
    }

</style>