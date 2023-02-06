<script>

    import { sceneStore } from "$lib/stores";
    import { seconds } from "$lib/clock.js";

    let bpm = 120;
    let beats = 4;

    $: beat = $seconds % beats;

</script>

<div class="container">

    <p>{bpm} bpm &times {beats} = {$sceneStore.speed}ms</p>

    <div class="dots">
        {#each Array(beats) as _,i}
            <div class:active={beat === i}></div>
        {/each}
    </div>

</div>

<style>

    .container {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    p {
        padding: 1rem;
    }

    .dots {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(4, auto);
        gap: 1rem;
        justify-items: center;
        align-items: center;
        justify-content: center;
        align-content: center;
    }
    .dots div {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: var(--color);
        transition: transform 100ms ease;
        transform: scale(0.5);
    }
    .dots div.active {
        background: var(--color);
        transform: scale(1);
    }

</style>