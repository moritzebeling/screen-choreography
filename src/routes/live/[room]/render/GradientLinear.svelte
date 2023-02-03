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
    <div></div>
    <div></div>
</main>

<style>

    main {
        position: fixed;
        top: -50vh;
        left: -100vw;
        width: 200vw;
        height: 200vh;
        display: flex;
    }
    main.animating {
        animation: slide 2s linear;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        animation-direction: normal;
    }
    
    main div {
        flex: 1;
        background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 100%
        );
    }

    @keyframes slide {
        0% {
            transform: translateX(0vw);
        }
        100% {
            transform: translateX(100vw);
        }
    }

</style>