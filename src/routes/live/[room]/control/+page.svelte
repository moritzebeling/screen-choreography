<script>

import { socket } from "$lib/realtime";

    class Color {
        constructor(r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
        }
    }

    let colors = [
        new Color(255,255,255),
        new Color(255,0,0),
        new Color(0,255,0),
        new Color(0,0,255),
        new Color(0,0,0),
        new Color(255,255,0),
        new Color(255,0,255),
        new Color(0,255,255),
    ];

    let speed = 1000;
    let color = colors[0];

    function updateVisual(){
        socket.emit("updateVisual",{
            speed,
            color
        });
    }

</script>

<main>

    <div class="grid">
        {#each colors as c}
            <div class="card" on:click={()=>{ color = c; updateVisual()}} style="background-color:rgb({c.r},{c.g},{c.b});">
                <p>{c.r}</p>
                <p>{c.g}</p>
                <p>{c.b}</p>
            </div>
        {/each}
    </div>

    <div class="bar">
        <p>Speed</p>
        <input type="range" min="100" max="10000" bind:value={speed} on:change="{updateVisual}">
        <p>{speed} ms</p>
    </div>

</main>

<style>

    main {
        height: var(--100vh);
        display: flex;
        flex-direction: column;
    }

    .grid {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .card {
        display: block;
        padding: 0.5rem;
    }
    .card p {
        mix-blend-mode: difference;
        font-feature-settings: "tnum";
    }

    .bar {
        padding: 1rem;
        display: flex;
        gap: 2rem;
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

    /******** Firefox ********/
    input[type="range"]::-moz-range-track {
        background: #053a5f;
        height: 0.5rem;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        margin-top: -0.8em; /* Centers thumb on the track */
        background-color: #fff;
        height: 1.6em;
        width: 1.6em;
        border-radius: 1.6em;
    }

</style>