<script>

    import { onMount } from "svelte";
    import { seconds } from "$lib/clock";
    import { morph, random } from "$lib/helpers";

    let white = Math.random() > 0.5;
    let whiteTarget = false;

    let currentSpeed = Math.random() > 0.4 ? random(75,2000) : random(3500,5500);
    let speedTarget = 3000;

    export let morphing = false;

    function loop(){
        white = !white;
        
        if( morphing ){
            currentSpeed = morph( currentSpeed, speedTarget, 150, 0.1 );
        }
        if( currentSpeed !== speedTarget ){
            console.log( currentSpeed );
            setTimeout( loop, currentSpeed );
        }
    }

    onMount(()=>{
        loop();

        setTimeout(()=>{
            morphing = true;
        }, 5000);
    });

    function switchTarget( s ){
        if( s === whiteTarget ) return;
        whiteTarget = s;
        if( currentSpeed === speedTarget ){
            white = whiteTarget;
        }
    }

    $: switchTarget( $seconds % 6 < 3 );

</script>

<main class:white style="
    --pulseSpeed:{currentSpeed}ms;
"></main>

<style>

    main {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: var(--color);
        transition: opacity var(--pulseSpeed) ease-in-out;
    }
    main.white {
        opacity: 1;
    }

</style>