<script>
    
    import { seconds } from "$lib/clock";

    /**
     * @param {Object} options
     * @param {number} options.columns
     * @param {number} options.rows
     */
    export let options = {
        columns: 4,
        rows: 1
    };

    $: cells = options.columns * options.rows;
    $: active = $seconds % cells;

</script>

<main style="
    grid-template-columns: repeat({options.columns}, 1fr);
    grid-template-rows: repeat({options.rows}, 1fr);
">
    {#each Array(cells) as _, i}
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