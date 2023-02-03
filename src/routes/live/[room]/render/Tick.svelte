<script>
    
    import { seconds } from "$lib/clock";

    /*
    options
    - time between states
    - transition speed (% of time between states)
    - color
    - border radius
    - width
    - height
    */

</script>

<main>
    <div class="dot" class:altered={$seconds % 2}></div>
</main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 50vw;
    }
    .dot {
        background-color: white;
        width: 30vw;
        height: 30vw;
        border-radius: 50%;
        transition: transform 500ms ease-in-out;
    }
    .altered {
        transform: translateX(50vw);
    }
    @media (orientation: portrait) {
        main {
            width: 100vw;
            height: 50vh;
        }
        .dot {
            width: 30vh;
            height: 30vh;
        }
        .altered {
            transform: translateY(50vh);
        }
    }

</style>