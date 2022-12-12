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

    button {
        cursor: pointer;
        display: block;
        padding: 0.5em 1em;
        border-radius: 2em;
        background-color: white;
        color: black;
        transition: background-color 200ms ease;
    }
    button.last {
        background-color: #999;
    }
    button:hover,
    button.active {
        background-color: #00f;
        color: black;
    }

</style>