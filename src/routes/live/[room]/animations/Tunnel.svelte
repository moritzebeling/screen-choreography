<script>

    let animating = true;

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
        --speed: 5s;
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
        animation: unfold var(--speed) ease-in;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        z-index: 1;
        border-radius: 100%;
    }
    main.animating div + div {
        background-color: var(--background);
        animation-delay: calc( var(--speed) / 2 );
    }

    @keyframes unfold {
        0% {
            transform: scale(2);
            z-index: 1;
            opacity: 0;
        }
        5%,
        98% {
            opacity: 1;
        }
        49% {
            transform: scale(2);
            z-index: 1;
        }
        50% {
            z-index: 2;
        }
        100% {
            z-index: 2;
            opacity: 0;
            transform: scale(0);
        }
    }

</style>