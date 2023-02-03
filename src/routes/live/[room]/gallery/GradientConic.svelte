<script>
    
    import { seconds } from "$lib/clock";

    /*
    options
    - colors
    - size
    */

    let animating = true; // start when time synced

    /*
    rgba(255,255,255,0),
    rgba(255,255,255,1)
    */

    export let colors = [
        "#f00",
        "#ff0",
        "#0f0",
        "#0ff",
        "#00f",
        "#f0f",
        "#f00"
    ];

</script>

<main class:animating>
    <div style="
        background: conic-gradient(
            {colors.join(",")}
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
        width: var(--100vh);
        height: var(--100vh);
        border-radius: 50%;
    }

    @media (orientation: portrait) {
        main div {
            width: 100vw;
            height: 100vw;
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