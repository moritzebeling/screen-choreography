<script>
    
    import { seconds } from "$lib/clock";

    /*
    options
    - speed
    - color
    - size
    */

    let animating = true; // start when time synced

</script>

<main class:animating>
    <div></div>
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
        width: 100vh;
        height: 100vh;
        border-radius: 50%;

        /* background: conic-gradient(
            rgba(0,0,0,0),
            rgba(0,0,0,1)
        ); */
    
        background: conic-gradient(
            #f00,
            #ff0,
            #0f0,
            #0ff,
            #00f,
            #f0f,
            #f00
        );
    }

    @media (orientation: portrait) {
        main div {
            width: 100vw;
            height: 100vw;
        }
    }

    main.animating div {
        animation: rotate 2s linear;
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