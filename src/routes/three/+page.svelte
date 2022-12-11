<script>

    import seedrandom from "seedrandom";
  
    import { seconds, time } from "$lib/system";

    let color = {r: 0, g: 0, b: 0};
    let last;

    function control( s ){
        if( s === last ){
            return;
        }
        last = s;
        let rndm = seedrandom( $time );
        color = {
            r: Math.floor( rndm() * 8 ) * 32,
            g: Math.floor( rndm() * 8 ) * 32,
            b: Math.floor( rndm() * 8 ) * 32,
        };
    }
    $: control(Math.floor( $seconds / 5 ));

</script>

<main style="background-color:rgb({color.r},{color.g},{color.b});"></main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: background-color 5s ease-in-out;
    }

</style>