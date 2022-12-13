<script>
    
    import { scenes, switchScene, pastScenes } from "$lib/control";

    export let id = 1;
    export let scene = scenes[id];

</script>

<button
    on:click={()=> switchScene(scene[0])}
    class:active={$pastScenes[0] === scene[0]}
    class:last={$pastScenes.includes(scene[0])}
    title={scene[1]}
    >
    <slot>{scene[1]}</slot>
</button>

<style>

    button.last {
        background-color: #999;
    }

</style>