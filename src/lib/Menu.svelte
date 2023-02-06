<script>

    export let items = [];
    export let open = true;
    export let fixed = false;

</script>

<div class:fixed>
    {#if open}
        <nav>
            {#each items as [title, url]}
                <a class="button" href="{url}">{title}</a>
            {/each}
            <slot />
        </nav>
    {:else}
        <button class="button" on:click={()=> open = true}>Menu</button>
    {/if}
</div>

<style>

    div {
        padding: 1rem;
        display: flex;
        justify-content: center;
    }
    .fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 10;
    }
    nav {
        display: flex;
        justify-content: center;
        gap: 0.3em;
    }

</style>