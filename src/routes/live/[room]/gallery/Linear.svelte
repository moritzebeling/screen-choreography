<script>

    /*
    options
    - speed
    - color
    */

    export let animating = true;

</script>

<main class:animating></main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--100vh);
    }
    main.animating {
        background-color: var(--color);
        animation: slideX var(--speed) linear;
        animation-iteration-count: infinite;
    }

    @media (orientation: portrait) {
        main.animating {
            animation-name: slideY;
        }
    }

    @keyframes slideX {
        0% {
            transform: translateX( -100vw );
        }
        100% {
            transform: translateX( 100vw );
        }
    }
    @keyframes slideY {
        0% {
            transform: translateY( var(--100vh) );
        }
        100% {
            transform: translateY( calc( var(--100vh) * -1) );
        }
    }

</style>