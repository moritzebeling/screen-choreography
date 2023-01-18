<script>

    import Menu from '$lib/Menu.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let options;
    export let value = options[0];

</script>

<div>

    <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->    
        {#each options as option}
            <li on:click={()=> dispatch('select',option) } style={option.toCss()}>
                <p>{@html option.toHtml()}</p>
            </li>
        {/each}
    </ul>
    
    <!-- <div>
        <Menu>
            <button class="button" on:click={()=> dispatch('close')}>Back</button>
        </Menu>
    </div> -->

</div>

<style>

    div {
        flex: 1;
        background-color: black;
    }

    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        flex: 1;
        height: 100%;
    }

    li {
        padding: 1rem;
        cursor: pointer;
    }
    
    li > * {
        mix-blend-mode: difference;
    }

</style>