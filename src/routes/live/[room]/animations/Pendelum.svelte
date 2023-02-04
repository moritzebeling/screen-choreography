<script>
    
    let animating = true;

    /**
     * @param {Object} options
     * @param {number} options.width percent of the screen width that the dot should be
     * @param {number} options.height percent of the screen height that the dot should be
     * @param {number} options.radius
     */
    export let options = {
        x: 0.5,
        y: 0.5,
        radius: 100
    };

</script>

<main class:animating style="
    --width: {options.x * 50};
    --height: {options.y * 50};
">
    <div class="dot" style="border-radius: {options.radius}%;"></div>
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
        animation: switchX var(--speed);
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-direction: alternate;
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
        main.animating {
            animation-name: switchY;
        }
        .dot {
            width: calc( 1vh * var(--width) );
            height: calc( 1vh * var(--height) );
        }
    }

    @keyframes switchX {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(50vw);
        }
    }

    @keyframes switchY {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY( calc( var(--100vh) / 2 ) );
        }
    }

</style>