<script>

    import { socket } from "../../socket.js";
    import { settingsStore, sceneStore, roomStore } from "$lib/stores";
    import { config } from "$lib/config";
    import { animations } from "../animations/animations.js";
    import Metronome from "./Metronome.svelte";
    import Text from "./Text.svelte";
    import ColorSelect from "./ColorSelect.svelte";

    let animation = '';
    let autoSend = false;
    let unsentChanges = false;
    let showColorSelect = false;
    let colorSelectMode = 'background';

    function selectColor(){
        if( autoSend ){
            updateScene( $sceneStore );
        } else {
            showColorSelect = false;
            unsentChanges = true;
        }
    }
    
    function updateScene(){
        console.log('io/live', 'scene:update', $sceneStore);
        socket.emit("scene:update", $sceneStore );
        unsentChanges = false;
    }

</script>

<svelte:head>
    <title>{config.title} (Control {$roomStore.title})</title>
</svelte:head>

<main class="grid">

    <div class="menu col-2 buttons">
        <a href={$roomStore.url()} class="button">{$roomStore.title}</a>
        <a href={$roomStore.url('control/settings')} class="button">Settings</a>
    </div>

    <div class="visual col-2">
        <div class="buttons">
            <button class="button" on:click={()=>{ showColorSelect = true; colorSelectMode = 'background' }}>Background</button>
            <button class="button" on:click={()=>{ showColorSelect = true; colorSelectMode = 'color' }}>Color</button>
            <select class="button" bind:value={animation}>
                <option value="">Animation</option>
                {#each Object.keys(animations) as anim}
                    <option value={animations[anim]}>{anim}</option>
                {/each}
            </select>
        </div>
    </div>
    
    <div class="col-2 metronome">
        <Metronome />
    </div>

    <div class="col-2">
        <Text />
    </div>

    <div class="col-2 buttons">
        <button class="button" class:red={autoSend} on:click={()=> autoSend = !autoSend}>Auto</button>
        <button class="button" class:red={unsentChanges} class:subtle={autoSend} on:click={updateScene}>Send</button>
    </div>

</main>

{#if showColorSelect}
    <ColorSelect {colorSelectMode} on:close={()=> showColorSelect = false} on:select={selectColor} />
{/if}

<style>

    .grid {
        height: var(--100vh);
        grid-template-rows: auto 1fr 1fr auto;
    }

    .visual {
        grid-row-end: span 4;
    }
    .visual .buttons {
        justify-content: flex-end;
    }

</style>