<script>

    let animating = true;

    /**
     * @param {Object} options
     * @param {number} options.x animation start x between 0 and 1
     * @param {number} options.y animation start y between 0 and 1
     */
    export let options = {
        x: 0,
        y: 0
    };

</script>

<main class:animating style="
    --x: {options.x};
    --y: {options.y};
">
    <div></div>
    <div></div>
</main>

<style>

    div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--100vh);
    }
    .animating div {
        background-color: var(--color);
        transition: background-color var(--speed) ease-in-out;
        animation: unfold var(--speed) ease-in;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        z-index: 1;
    }
    .animating div + div {
        background-color: var(--background);
        animation-delay: calc( var(--speed) / 2 );
    }

    @keyframes unfold {
        0% {
            transform: scale( var(--x), var(--y) );
            z-index: 2;
        }
        49% {
            z-index: 2;
        }
        50%, 100% {
            z-index: 1;
            transform: scale( 1, 1 );
        }
    }

</style>