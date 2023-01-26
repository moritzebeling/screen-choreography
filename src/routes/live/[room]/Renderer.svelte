<script>

    import RenderComposition from "./render/RenderComposition.svelte";
    import { sceneStore } from "$lib/stores";

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
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--100vh);
        transition-property: background-color;
        transition-timing-function: ease-in-out;
        z-index: -1;
    }

</style>