<script>

    import Menu from '$lib/Menu.svelte';
    import RenderComposition from '../_render/RenderComposition.svelte';
    import { Composition } from '$lib/models/Composition';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let options = [
        new Composition({
            styles: {
                'background': 'white',
            },
            timing: {
                duration: 2000,
                iterations: Infinity,
            },
            keyframes: [
                { opacity: 0 },
                { opacity: 1 },
                { opacity: 0 },
            ]
        }),
        new Composition({
            styles: {
                'background': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
            },
            timing: {
                duration: 2000,
                iterations: Infinity,
            },
            keyframes: [
                { 'transform': 'translateX(-100vw)' },
                { 'transform': 'translateX(100vw)' },
            ]
        })
    ];
    export let value = options[0];

</script>

<div class="layout fixed">

    <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->    
        {#each options as option}
            <li on:click={()=> dispatch('select',option) }>
                <RenderComposition composition={option} />
            </li>
        {/each}
    </ul>
    
    <div>
        <Menu>
            <button class="button" on:click={()=> dispatch('close')}>Back</button>
        </Menu>
    </div>

</div>

<style>

    .layout {
        background-color: black;
    }

    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        flex: 1;
    }

    li {
        cursor: pointer;
    }

</style>