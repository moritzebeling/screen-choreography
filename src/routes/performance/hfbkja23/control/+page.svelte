<script>

    import throttle from 'just-throttle';
    import { socket } from "../socket.js";
    import { performanceStore, roomStore, userStore } from "$lib/stores";
    import { PerformanceScene } from "$lib/models/PerformanceScene.js";
    import ColorSelect from "./ColorSelect.svelte";
    import { presets } from './presets.js';
    import { onMount } from 'svelte';
    import Text from './Text.svelte';

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

    function speedup(){
        scene.interval = Math.max(
            50,
            Math.round(scene.interval * 0.8)
        );
        send();
    }
    function selectPreset( event ){
        scene = scene.apply(event.detail);
        send();
    }

    onMount(()=>{
        socket.emit('room:leave');
        socket.emit('room:join');
    });

</script>

<svelte:head>
    <title>Performance Control</title>
</svelte:head>

<aside>
    <div class="button">
        {$roomStore.users.length} online
    </div>
    <button class="button" on:click={resetRoom}>
        Reset room
    </button>
</aside>

<main>
    <Text on:select={selectPreset} on:speedup={speedup} on:redirect={redirect} />
</main>
<main>

    <div>
        {#each Object.entries(presets) as [key, preset]}
            <button class="button preset" on:click={()=>{ scene = scene.apply(preset); send() }}>
                {preset.title}
            </button>
        {/each}
    </div>

    <ColorSelect bind:value={scene.background} />

    <ColorSelect bind:value={scene.color} />

    <div class="grid">
        
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

        <label class="col-6">
            <div>
                <p>Interval speed</p>
                <p>{scene.interval}ms</p>
            </div>
            <input type="range" min="50" step="10" max="5000" bind:value={scene.interval} />
        </label>
        
        <button class="button col-1" on:click={speedup}>
            -20%
        </button>

        <button class="button col-1" on:click={()=> scene.interval = Math.round(scene.interval * 1.2) }>
            +20%
        </button>
        
        <button class="button col-1" class:alert={scene.rotate} on:click={()=> scene.rotate = !scene.rotate }>
            Rotate
        </button>

    </div>

    <div class="circles">
        <button class="button circle" class:alert={autoSend} on:click={()=> autoSend = !autoSend }>
            Auto push
        </button>
        <button class="button circle" class:alert={pendingChanges} on:click={send}>
            Push
        </button>
    </div>

</main>

<style>

    .grid {
        grid-template-columns: repeat(9, 1fr);
        gap: 1rem;
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
        margin: 3px;
        display: inline-block;
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
        background-color: red;
        color: black;
    }

    main {
        margin: 16rem auto;
        padding: 0 2rem;
        max-width: 60rem;
    }
    aside {
        position: fixed;
        top: 0;
        right: 0;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .circles {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    .button.circle {
        border-radius: 50%;
        width: 16rem;
        height: 16rem;
        font-size: 2rem;
        margin: 4rem 0 16rem;
    }

</style>