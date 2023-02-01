<script>

    import { socket } from "../../socket.js";
    import { settingsStore, sceneStore, roomStore } from "$lib/stores";
    import Select from "./Select.svelte";
    import AnimationSelect from "./AnimationSelect.svelte";
    import { config } from "$lib/config";

    function updateScene(){
        console.log( $sceneStore );
        socket.emit( "scene:update", $sceneStore );
    }

    let showBackgroundColorSelect = true;
    let showAnimationSelect = false;

</script>

<svelte:head>
    <title>{config.title} (Control {$roomStore.title})</title>
</svelte:head>

<main class="layout">

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- <div class="screens">
        <div class="background" style="{$sceneStore.background.toCss()}" on:click={()=>showBackgroundColorSelect=true}>
            <p>Background</p>
        </div>
        <div class="animation" style="{$sceneStore.background.toCss()}" on:click={()=>showAnimationSelect=true}>
            <p>Animation</p>
        </div>
    </div> -->

    {#if showBackgroundColorSelect}
        <Select options={$settingsStore.colors}
            on:select={(e)=>{$sceneStore.background = e.detail; updateScene()}}
            on:close={()=> showBackgroundColorSelect = false }
            />
    {/if}

    <div class="bar">
        <p>Speed</p>
        <input type="range" min="100" max="10000" bind:value={$sceneStore.backgroundSpeed} on:change="{updateScene}">
        <p>{$sceneStore.backgroundSpeed} ms</p>
    </div>

</main>

<!-- {#if showAnimationSelect}
    <AnimationSelect
        on:select={(e)=>{$sceneStore.animation = e.detail; updateScene()}}
        on:close={()=> showAnimationSelect = false }
        />
{/if} -->

<style>

    .layout {
        background: black;
    }

    .screens {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        flex: 1;
    }
    .screens > div {
        padding: 1rem;
        cursor: pointer;
    }

    .bar {
        display: flex;
    }
    .bar input {
        flex: 1;
        display: block;
    }
    input[type="range"]{
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        cursor: pointer;
    }
    input[type="range"]::-webkit-slider-runnable-track {
        background: #333;
        height: 2px;
    }
    input[type="range"]::-moz-range-track {
        background: #053a5f;
        height: 0.5rem;
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        margin-top: -0.8em;
        background-color: #fff;
        height: 1.6em;
        width: 1.6em;
        border-radius: 1.6em;
    }

</style>