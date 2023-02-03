<script>
    
    import { seconds } from "$lib/clock";

    /*
    options
    - time between states
    - transition speed (% of time between states)
    - option to go out of sync, random speed, and come back in sync??
    - color
    */

</script>

<main class:altered={$seconds % 2}></main>

<style>

    main {
        position: fixed;
        top: -50vh;
        left: -50vw;
        height: 200vh;
        width: 200vw;
        opacity: 0;
        background-color: white;
        transition: opacity 1s ease-in-out;
    }
    .altered {
        opacity: 1;
    }

</style>