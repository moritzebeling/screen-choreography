<script>

    import throttle from 'just-throttle';
    import { socket } from "../socket.js";
    import { performanceStore, roomStore, userStore } from "$lib/stores";
    import { PerformanceScene } from "$lib/models/PerformanceScene.js";
    import ColorSelect from "./ColorSelect.svelte";
    import { presets } from './presets.js';
    import { onMount } from 'svelte';

    let scene = new PerformanceScene();

    let autoSend = false;
    let pendingChanges = false;
    
    const send = throttle(() => {
        pendingChanges = false;
        console.log('scene:update', scene);
        socket.emit('scene:update', scene);
        performanceStore.set(scene);
    }, 500, {trailing: true});

    function update(_){
        pendingChanges = true;
        if( autoSend ){
            send();
        }
    }
    $: update( scene );

    function resetRoom(){
        socket.emit('room:reset');
    }

    function redirect(){
        socket.emit('redirect');
    }

    onMount(()=>{
        socket.emit('room:leave');
        socket.emit('room:join');
    });

</script>

<svelte:head>
    <title>Performance Control</title>
</svelte:head>

<div class="grid">

    <button class="col-2" on:click={redirect}>
        Redirect
    </button>
    <button class="col-2" on:click={resetRoom}>
        Reset room
    </button>
    <div class="col-8 info">
        {$roomStore.users.length} users online
    </div>

</div>

<div class="grid">
    {#each presets as preset}
        <button class="col-2 preset" on:click={()=> scene = scene.apply(preset) }>
            {preset.title}
        </button>
    {/each}
</div>

<div class="grid">

    <ColorSelect bind:value={scene.background} />

    <button class="col-3 row-2" class:alert={pendingChanges} on:click={send}>
        Push
    </button>
    
    <ColorSelect bind:value={scene.color} />

    <label class="col-3">
        <div>
            <p>Background speed</p>
            <p>{scene.speed}ms</p>
        </div>
        <input type="range" min="0" step="10" max="5000" bind:value={scene.speed} />
    </label>

    <label class="col-3">
        <div>
            <p>Fade In</p>
            <p>{scene.fadeIn}ms</p>
        </div>
        <input type="range" min="0" step="10" max="5000" bind:value={scene.fadeIn} />
    </label>

    <label class="col-3">
        <div>
            <p>Fade Out</p>
            <p>{scene.fadeOut}ms</p>
        </div>
        <input type="range" min="0" step="10" max="5000" bind:value={scene.fadeOut} />
    </label>

    <button class="col-3" class:alert={autoSend} on:click={()=> autoSend = !autoSend }>
        Auto push
    </button>
    
    <button class="col-1" on:click={()=> scene.interval = Math.max(50,Math.round(scene.interval * 0.8)) }>
        -20%
    </button>
    
    <label class="col-7">
        <div>
            <p>Interval speed</p>
            <p>{scene.interval}ms</p>
        </div>
        <input type="range" min="50" step="10" max="5000" bind:value={scene.interval} />
    </label>

    <button class="col-1" on:click={()=> scene.interval = Math.round(scene.interval * 1.2) }>
        +20%
    </button>

    <button class="col-3" class:alert={scene.rotate} on:click={()=> scene.rotate = !scene.rotate }>
        Rotate
    </button>

</div>

<style>

    .grid {
        grid-template-columns: repeat(12, 1fr);
        gap: 1rem;
        margin: 1rem;
        padding: 0;
    }
    label {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    label > div {
        display: flex;
        justify-content: space-between;
    }
    button {
        background-color: #222;
        padding: 1rem;
    }
    label, .info {
        background-color: #222;
        border-radius: 1rem;
        padding: 1rem;
    }
    label p {
        margin-bottom: 1rem;
    }
    .alert {
        background-color: white;
        color: black;
    }

</style>