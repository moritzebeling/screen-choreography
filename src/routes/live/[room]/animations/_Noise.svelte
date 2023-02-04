<script>
    
    import { seconds } from "$lib/clock";
    import { createNoise3D } from 'simplex-noise';
    import { onMount } from "svelte";

    export let columns = 12;
    export let rows = 12;

    let cells = columns * rows;

    let noise, interval;
    let time = $seconds;
    let raster = Array.from(Array(cells));
    
    onMount(()=>{
        noise = createNoise3D();
        interval = setInterval( update, 100 );
        return () => {
            noise = null;
            clearInterval(interval);
        }
    });

    function update(){
        raster = raster.map( (_, i) => {
            let x = ( i % columns ) / 20;
            let y = ( Math.floor(i / rows) ) / 20;
            let value = noise(x, y, time);
            return Math.round( value * 20 ) / 20;
        });
        time += 0.05;
    }

</script>

<main style="
    grid-template-columns: repeat({columns}, 1fr);
    grid-template-rows: repeat({rows}, 1fr);
">
    {#each raster as c}
        <div style="opacity: {c};"></div>
    {/each}
</main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        height: var(--100vh);
        width: 100vw;
        display: grid;
    }

    div {
        transition: opacity 1s ease;
        background-color: var(--color);
    }

</style>