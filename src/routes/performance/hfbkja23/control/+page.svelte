<script>

    /*
    scene options
    - background color
        - all the same or offset by user num
    - stay on or fade out
        - fade out speed
    - rotate or synchronize
        - rotation speed
    */

    import { socket } from "../socket.js";
    import { performanceStore } from "$lib/stores";
    import { PerformanceScene } from "$lib/models/PerformanceScene.js";

    let scene = new PerformanceScene();

    let autoSend = false;
    let pendingChanges = false;

    function send(){
        pendingChanges = false;
        console.log('scene:update', scene);
        socket.emit('scene:update', scene);
        performanceStore.set(scene);
    }
    function update(_){
        if( !autoSend ){
            pendingChanges = true;
            return;
        }
        // todo throttle
        send();
    }
    $: update( scene );

    function resetRoom(){
        socket.emit('room:reset');
    }

</script>

<form class="grid">

    <label class="col-2 color" style="background-color: {scene.background || '#222'};">
        <p>Background color</p>
        <select bind:value={scene.background}>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="#f00">Red</option>
            <option value="#0f0">Green</option>
            <option value="#00f">Blue</option>
        </select>
    </label>

    <label class="col-2">
        <p>Background speed: {scene.speed}ms</p>
        <input type="range" min="0" max="10000" step="200" bind:value={scene.speed} />
    </label>

    <label class="col-2 color" style="background-color: {scene.color || '#222'};">
        <p>Flicker color</p>
        <select bind:value={scene.color}>
            <option value={false}>—</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="#f00">Red</option>
            <option value="#0f0">Green</option>
            <option value="#00f">Blue</option>
            <option value="rainbow">Rainbow!</option>
        </select>
    </label>
    
    <label class="col-1">
        <p>Fade in: {scene.fadeIn}ms</p>
        <input type="range" min="0" max="10000" step="200" bind:value={scene.fadeIn} />
    </label>
    
    <label class="col-1">
        <p>Fade out: {scene.fadeOut}ms</p>
        <input type="range" min="0" max="10000" step="200" bind:value={scene.fadeOut} />
    </label>
    
    <label class="col-2">
        <p>Rotate</p>
        <select bind:value={scene.rotate}>
            <option value={false}>Still</option>
            <option value={true}>Rotate</option>
        </select>
    </label>

    <label class="col-2">
        <p>Interval: {scene.interval}ms</p>
        <input type="range" min="0" max="10000" step="100" bind:value={scene.interval} />
    </label>

    <label class="col-2" class:alert={autoSend}>
        <p>Send mode</p>
        <select bind:value={autoSend}>
            <option value={false}>Manual</option>
            <option value={true}>Auto</option>
        </select>
    </label>
   
    {#if !autoSend}
        <label class="col-2" class:alert={pendingChanges}>
            <button on:click={send}>Send</button>
        </label>
    {/if}
        
    <label class="col-2">
        <button on:click={resetRoom}>Reset Room</button>
    </label>

</form>

<style>

    .grid, pre {
        padding: 1rem;
        gap: 0.5rem;
    }

    .color p, .color select {
        color: white;
        mix-blend-mode: difference;
    }
    label {
        background-color: #222;
        border-radius: 1rem;
        padding: 1rem;
    }
    label p {
        margin-bottom: 1rem;
    }
    select {
        text-align: inherit;
        text-align-last: inherit;
        background-color: transparent;
    }
    input {
        display: block;
        width: 100%;
    }
    .alert {
        background-color: #f00;
    }

</style>