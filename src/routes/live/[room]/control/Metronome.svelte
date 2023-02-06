<script>

    import { sceneStore } from "$lib/stores";
    import { seconds } from "$lib/clock.js";
    import { createEventDispatcher } from 'svelte';
    
	const dispatch = createEventDispatcher();

    let bpm = 120;
    let beats = 4;

    /*
    @todo
    $seconds ist hier nicht das richtige... Date.now() / 1000 ?
    */

    $: beat = $seconds % beats;

    function update(){
        sceneStore.update( s => {
            s.speed = Math.round(1000 / ( bpm / 60 )) * beats;
            return s;
        });
        dispatch('update');
    }
    $: update( beats, bpm );

    const presets = {
        beats: [ 1, 2, 4, 8, 16, 32, 64 ],
        bpm: [ 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300 ]
    };

</script>

<div class="container">

    <p>
        <select bind:value={bpm}>
            {#each presets.bpm as b}
                <option value={b}>{b}</option>
            {/each}
        </select>
        bpm &times
        <select bind:value={beats}>
            {#each presets.beats as b}
                <option value={b}>{b}</option>
            {/each}
        </select>
        beats
        = {$sceneStore.speed} ms
    </p>

    <div class="dots" class:many={beats > 16}>
        {#each Array(beats) as _,i}
            <div class:active={beat === i}></div>
        {/each}
    </div>

</div>

<style>

    .container {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    p {
        padding: 1rem;
    }

    .dots {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(4, auto);
        gap: 1rem;
        justify-items: center;
        align-items: center;
        justify-content: center;
        align-content: center;
        z-index: -1;
    }
    .dots.many {
        grid-template-columns: repeat(8, auto);
    }
    .dots div {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: var(--color);
        transition: transform 100ms ease;
        transform: scale(0.5);
    }
    .dots div.active {
        background: var(--color);
        transform: scale(1);
    }

</style>