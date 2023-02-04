<script>

    export let animating = true;

    export let x = false;
    export let y = true;

</script>

<main class:animating style="
    --x: {x ? 0 : 1};
    --y: {y ? 0 : 1};
">
    <div></div>
    <div></div>
</main>

<style>

    p {
        position: fixed;
        z-index: 100;
        color: red;
    }
    div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--100vh);
    }
    .animating div {
        background-color: var(--color);
        animation: unfold var(--speed) ease-in;
        animation-iteration-count: infinite;
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