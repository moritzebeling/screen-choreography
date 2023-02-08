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
    import ColorSelect from "./ColorSelect.svelte";

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

<div class="grid">

    <ColorSelect bind:value={scene.background} />

    <button class="col-3 row-2" class:alert={pendingChanges} on:click={send}>
        Push
    </button>
    
    <ColorSelect bind:value={scene.color} />
    
</div>

<div class="grid">

    <label class="col-3">
        <div>
            <p>Background speed</p>
            <p>{scene.speed}ms</p>
        </div>
        <input type="range" min="0" max="5000" bind:value={scene.speed} />
    </label>

    <label class="col-3">
        <div>
            <p>Fade In</p>
            <p>{scene.fadeIn}ms</p>
        </div>
        <input type="range" min="0" max="5000" bind:value={scene.fadeIn} />
    </label>

    <label class="col-3">
        <div>
            <p>Fade Out</p>
            <p>{scene.fadeOut}ms</p>
        </div>
        <input type="range" min="0" max="5000" bind:value={scene.fadeOut} />
    </label>

    <button class="col-3" class:alert={autoSend} on:click={()=> autoSend = !autoSend }>
        Auto push
    </button>
    
    <button class="col-1" on:click={()=> scene.interval = Math.max(30,Math.round(scene.interval * 0.8)) }>
        -20%
    </button>
    
    <label class="col-7">
        <div>
            <p>Interval speed</p>
            <p>{scene.interval}ms</p>
        </div>
        <input type="range" min="100" max="5000" bind:value={scene.interval} />
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
    }

    label {
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