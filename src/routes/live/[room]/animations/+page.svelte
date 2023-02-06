<script>
    
    import Menu from "$lib/Menu.svelte";

    import { animations } from "./animations.js";

    let animation = animations[0];

</script>

<Menu fixed={true}>
    <select class="button" bind:value={animation}>
        {#each Object.keys(animations) as anim}
            <option value={animations[anim]}>{anim}</option>
        {/each}
    </select>
</Menu>

<svelte:component this={animation} />

<style>
</style>