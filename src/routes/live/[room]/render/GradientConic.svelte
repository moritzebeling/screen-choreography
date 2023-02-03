<script>
    
    import { seconds } from "$lib/clock";

    /*
    options
    - speed
    - color
    */

    let animating = true; // start when time synced

</script>

<main class:animating>
</main>

<style>

    main {
        position: fixed;
        top: -50vh;
        left: -50vw;
        width: 200vw;
        height: 200vh;
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

    main.animating {
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