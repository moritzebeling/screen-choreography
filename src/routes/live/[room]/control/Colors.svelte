<script>

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let colors = [
        // new Color(255,255,255),
        // new Color(255,0,0),
        // new Color(0,255,0),
        // new Color(0,0,255),
        // new Color(0,0,0),
        // new Color(255,255,0),
        // new Color(255,0,255),
        // new Color(0,255,255),
    ];

</script>

<div class="grid">
    <div class="bar">
        <h2>Set Background color</h2>
    </div>
    <ul>
        {#each colors as c}
            <div class="card" on:click={()=>{ color = c; updateVisual()}} style="background-color:rgb({c.r},{c.g},{c.b});">
                <p>{c.r}</p>
                <p>{c.g}</p>
                <p>{c.b}</p>
            </div>
        {/each}
    </ul>
    <div class="bar">
        <button>Back</button>
        <button>Add color</button>
        <button>Reset colors</button>
    </div>
</div>