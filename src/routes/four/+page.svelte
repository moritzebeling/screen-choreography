<script>
  
    import { seconds } from "$lib/system";

    $: white = $seconds % 6 < 3;

</script>

<main class:white></main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        transition: background-color 3s ease-in-out;
    }
    main.white {
        background-color: white;
    }

</style>