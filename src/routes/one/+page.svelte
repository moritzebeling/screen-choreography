<script>

    import seedrandom from "seedrandom";
  
    import { seconds } from "$lib/system";

    let large = false;

    function control(){
        let rndm = seedrandom( $seconds / 2 )
        large = rndm() > 0.5;
    }
    $: control( $seconds );

</script>

<main class:large></main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        transition: background-color 500ms ease-in-out;
    }
    main.large {
        background-color: white;
    }

</style>