<script>
    
    import Menu from "$lib/Menu.svelte";

    import Tick from "./Tick.svelte";
    import Flicker from "./Flicker.svelte";
    import Linear from "./Linear.svelte";
    import GradientConic from "./GradientConic.svelte";
    import Dots from "./Dots.svelte";
    import Raster from "./Raster.svelte";
    import Unfold from "./Unfold.svelte";

    let animations = {
        "Tick": Tick,
        "Flicker": Flicker,
        "Linear": Linear,
        "GradientConic": GradientConic,
        "Dots": Dots,
        "Raster": Raster,
        "Unfold": Unfold,
    };

    let animation = Tick;

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
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        text-align: center;
        text-align-last: center;
    }
    select:focus {
        outline: none;
    }
</style>