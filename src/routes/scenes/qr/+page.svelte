<script>

    import { seconds } from "$lib/system";

    let animating = false;

    function switchTarget( s ){
        if( s % 3 === 1 ){
            animating = true;
        }
    }

    $: switchTarget( $seconds );

    /* @todo insert qe code */

</script>

<main>
    <figure class:animating><h1>QR</h1></figure>
</main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--100vh);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
    }

    figure {
        width: 70vh;
        height: 70vh;
        background-color: black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    figure.animating {
        animation: hovering 5s ease-in-out infinite;
    }

    @keyframes hovering {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.5);
        }
    }

</style>