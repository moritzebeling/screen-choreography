<script>

    let animating = true;

    /**
     * @param {Object} options
     * @param {Array<String>} options.colors array of css colors
     */
    export let options = {
        colors: [
            'var(--color)',
            'var(--background)',
        ]
    };  

    /*
    rainbow
        '#f00',
        '#ff0',
        '#0f0',
        '#0ff',
        '#00f',
        '#f0f',
        '#f00'
    */

</script>

<main class:animating>
    <div style="
        background: conic-gradient(
            {options.colors.join(",")}
        );
    "></div>
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
    }
    
    main div {
        width: 200vw;
        height: 200vw;
        flex: 0 0 auto;
    }

    @media (orientation: portrait) {
        main div {
            width: 200vh;
            height: 200vh;
        }
    }

    main.animating div {
        animation: rotate var(--speed) linear;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        animation-direction: normal;
    }
    
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>