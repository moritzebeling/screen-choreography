<script>
    
    import { seconds } from "$lib/clock";

    export let columns = 4;
    export let rows = 1;

    $: cells = columns * rows;
    $: active = $seconds % cells;

</script>

<main style="
    grid-template-columns: repeat({columns}, 1fr);
    grid-template-rows: repeat({rows}, 1fr);
">
    {#each Array(cells) as c, i}
        <div class:active={active === i}></div>
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
        transition: background-color 300ms ease;
    }
    div.active {
        background-color: var(--color);
    }

</style>