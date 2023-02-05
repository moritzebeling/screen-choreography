<script>
    
    import Menu from "$lib/Menu.svelte";

    import Pendelum from "./Pendelum.svelte";
    import Flicker from "./Flicker.svelte";
    import Linear from "./Linear.svelte";
    import GradientConic from "./GradientConic.svelte";
    import DebugDots from "./DebugDots.svelte";
    import Raster from "./Raster.svelte";
    import Unfold from "./Unfold.svelte";
    import Tunnel from "./Tunnel.svelte";
    import Vertigo from "./Vertigo.svelte";
    import Colors from "./Colors.svelte";

    let animations = {
        "Pendelum": Pendelum,
        "Flicker": Flicker,
        "Linear": Linear,
        "Conic": GradientConic,
        "Debug Dots": DebugDots,
        "Raster": Raster,
        "Unfold": Unfold,
        "Tunnel": Tunnel,
        "Vertigo": Vertigo,
        "Colors": Colors,
    };

    let animation = animations[0];

    // let options = {
    //     colors: [],
    //     radius: 1, // 0 - 1
    //     x: 0, // 0 - 1
    //     y: 0, // 0 - 1
    //     columns: 2, // 1 - 8
    //     rows: 2, // 1 - 8
    // };

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