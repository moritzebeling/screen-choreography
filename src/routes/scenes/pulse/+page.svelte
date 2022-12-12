<script>

    import { onMount } from "svelte";
    import { seconds } from "$lib/system";
    import Text from "$lib/Text.svelte";
    import { random } from "$lib/helpers";

    let white = Math.random() > 0.5;
    let whiteTarget = false;

    let currentSpeed = Math.random() > 0.5 ? random(75,2000) : random(4000,6500);
    let speedTarget = 3000;

    let morphing = false;

    function morph( value, target, threshold = 150 ){
        const diff = target - value;
        if( Math.abs(diff) < threshold ){
            return target;
        }
        if( value < target ){
            value = Math.min( value * 1.1, target );
        } else {
            value = Math.max( value * 0.9, target );
        }
        return Math.floor( value );
    }

    function loop(){
        white = !white;
        
        if( morphing ){
            currentSpeed = morph( currentSpeed, speedTarget );
        }
        if( currentSpeed !== speedTarget ){
            console.log( currentSpeed );
            setTimeout( loop, currentSpeed );
        }
    }

    onMount(()=>{
        loop();
    });

    function handle( event ){
        if( event.code !== 'Space' ) return;
        // @todo
        morphing = true;
    }

    function switchTarget( s ){
        if( s === whiteTarget ) return;
        whiteTarget = s;
        if( currentSpeed === speedTarget ){
            white = whiteTarget;
        }
    }

    $: switchTarget( $seconds % 6 < 3 );

</script>

<svelte:window on:keydown|preventDefault={handle} on:click={handle} />

<!-- <Text cl="blue">
    <p>
        Original: {currentSpeed}ms {white}<br />
        Adjust: {morphing}<br />
        Targeted: {$seconds} {whiteTarget}<br />
    </p>
</Text>

<div class="test" class:whiteTarget style="--speed:{speedTarget}ms;"></div> -->

<main class:white style="--speed:{currentSpeed}ms;"></main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        transition: background-color var(--speed) ease-in-out;
    }
    main.white {
        background-color: white;
    }

    .test {
        position: fixed;
        top: 1rem;
        right: 1rem;
        width: 100px;
        height: 100px;
        border-radius: 100px;
        background-color: black;
        z-index: 5;
        transition: background-color var(--speed) ease-in-out;
    }
    .test.whiteTarget {
        background-color: white;
    }

</style>