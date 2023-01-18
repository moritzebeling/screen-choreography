<script>

    import RenderComposition from "./render/RenderComposition.svelte";
    import { sceneStore } from "./store.js";

</script>

<main style="
    transition-duration:{$sceneStore.backgroundSpeed}ms;
    {$sceneStore.background.toCss()}
    ">

    {#if $sceneStore.animation.styles}
        <RenderComposition composition={$sceneStore.animation} />
    {/if}

</main>

<style>

    main {
        height: var(--100vh);
        transition-property: background-color;
        transition-timing-function: ease-in-out;
    }

</style>