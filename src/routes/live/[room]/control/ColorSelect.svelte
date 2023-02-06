<script>
    
    import { randomColor } from "$lib/helpers";
    import { sceneStore } from "$lib/stores";
    import { createEventDispatcher } from 'svelte';
    
	const dispatch = createEventDispatcher();

    export let colorSelectMode = 'background';

    let colors = [
        'white',
        'black',
        '#f00',
        '#ff0',
        '#0f0',
        '#0ff',
        '#00f',
        '#f0f',
    ];

    function addColor() {
        colors.push( randomColor() );
        colors.push( randomColor() );
        colors = colors;
    }

    function removeColor(i) {
        colors.splice(i, 1);
        colors = colors;
    }

    function select(i){
        let s = {};
        s[colorSelectMode] = colors[i];
        $sceneStore.update( s );
        dispatch('select');
    }

</script>

<div class="grid">
    <div class="col-4 bar">
        <div class="buttons">
            <button class="button" class:subtle={colorSelectMode != 'background'} on:click={()=> colorSelectMode = 'background'}>Background</button>
            <button class="button" class:subtle={colorSelectMode != 'color'} on:click={()=> colorSelectMode = 'color'}>Color</button>
            <button class="button subtle" on:click={addColor}>Add color</button>
        </div>
        <div class="buttons">
            <button class="button" on:click={() => dispatch('close')}>Close</button>
        </div>
    </div>
    {#each colors as color, i}
        <div class="color col-2" style="background:{color};" on:click={()=>select(i)}>
            {#if i < 8}
                <p>{color}</p>
            {:else}
                <div class="control-color" on:click|stopPropagation>
                    <input bind:value={colors[i]} />
                    <button on:click={() => removeColor(i)}>&times;</button>
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    
    .grid {
        position: fixed;
        grid-template-rows: auto 1fr;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--100vh);
        color: #999;
    }
    .bar {
        display: flex;
        justify-content: space-between;
    }
    .color {
        padding: 0.5rem;
        padding-bottom: 4rem;
        display: flex;
        justify-content: space-between;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        gap: 1rem;
        cursor: pointer;
    }
    input {
        background: transparent;
        flex: 1;
    }

</style>