<script>
    
    export let animating = true;

    /**
     * percent of the screen width/height that the dot should be
     * @type {number}
     */
    export let width = 50;
    export let height = 50;

    /**
     * percent of radius
     * @type {number}
     */
    export let borderRadius = 100;

</script>

<main class:animating style="
    --width: {width / 2};
    --height: {height / 2};
">
    <div class="dot" style="border-radius: {borderRadius}%;"></div>
</main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: var(--100vh);
        width: 50vw;
    }
    main.animating {
        animation: switch var(--speed);
        animation-iteration-count: infinite;
        animation-timing-function: ease;
    }

    .dot {
        background-color: var(--color);
        width: calc( 1vw * var(--width) );
        height: calc( 1vw * var(--height) );
    }

    @media (orientation: portrait) {
        main {
            width: 100vw;
            height: 50vh;
        }
        .dot {
            width: calc( 1vh * var(--width) );
            height: calc( 1vh * var(--height) );
        }
    }

    @keyframes switch {
        10%, 90% {
            transform: translateX(0);
        }
        40%, 60% {
            transform: translateX(50vw);
        }
    }

</style>