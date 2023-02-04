<script>
    
    let animating = true;

    /*
    options
    - option to go out of sync, random speed, and come back in sync??
    */

</script>

<main class:animating></main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        height: var(--100vh);
        width: 100vw;
        background-color: var(--color);
        opacity: 0;
    }
    main.animating {
        animation: flicker var(--speed);
        animation-iteration-count: infinite;
        animation-timing-function: ease;
    }

    @keyframes flicker {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }

</style>