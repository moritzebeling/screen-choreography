<script>
    
    import Tick from "./Tick.svelte";
    import Flicker from "./Flicker.svelte";
    import GradientLinear from "./GradientLinear.svelte";
    import GradientConic from "./GradientConic.svelte";
  import Menu from "$lib/Menu.svelte";

    let animations = {
        "Tick": Tick,
        "Flicker": Flicker,
        "GradientLinear": GradientLinear,
        "GradientConic": GradientConic
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
    .menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        padding: 1rem;
        z-index: 100;
    }
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        text-align: center;
    }
    select:focus {
        outline: none;
    }
</style>