<script>

    import { socket } from "$lib/realtime";    
    import Select from "./Select.svelte";
    import { settingsStore, sceneStore } from "../store.js";

    function updateScene(){
        console.log( $sceneStore );
        socket.emit( "updateScene", $sceneStore );
    }

    let showBackgroundColorSelect = false;

</script>

<main class="layout">

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="screens">
        <div class="background" style="{$sceneStore.background.toCss()}" on:click={()=>showBackgroundColorSelect=true}>
            <p>Background</p>
        </div>
    </div>

    <div class="bar">
        <p>Speed</p>
        <input type="range" min="100" max="10000" bind:value={$sceneStore.backgroundSpeed} on:change="{updateScene}">
        <p>{$sceneStore.backgroundSpeed} ms</p>
    </div>

</main>

{#if showBackgroundColorSelect}
    <Select options={$settingsStore.colors}
        on:select={(e)=>{$sceneStore.background = e.detail; showBackgroundColorSelect = false; updateScene()}}
        on:close={()=> showBackgroundColorSelect = false }
        />
{/if}

<style>

    .screens {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        flex: 1;
    }
    .screens > div {
        padding: 1rem;
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