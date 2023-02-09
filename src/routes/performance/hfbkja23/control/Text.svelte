<script>

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { presets } from "./presets.js";

    function select( id ){
        let preset = presets[id];
        dispatch('select', preset);
    }
    function redirect(){
        dispatch('redirect');
    }
    function speedup(){
        dispatch('speedup');
    }

</script>

<article>
    <button on:click={()=>{select('white'); redirect();}}>Redirect and all white</button>
    <button on:click={()=>select('black')}>All black</button>
    <button on:click={()=>select('white-buildup')}>White build up</button>
    <button on:click={()=>select('white')}>All white</button>
    <button on:click={()=>select('ticks')}>White ticks</button>
</article>

<article>
    <p>0</p>
    <button on:click={speedup}>Increase speed</button>
    <p>One thing about programming as a tool for creating visual images is, that the result we see is being created in that very moment.</p>
    <button on:click={speedup}>Increase speed</button>
    <p>When looking at other forms of media: a video, a painting, a static design, production and presentation are inherently separated processes.</p>
    <button on:click={speedup}>Increase speed</button>
    <p>
        Through the continuous iteration of computing and rendering,
        a programmed visual can be altered
        by input that is being created or updated during runtime,
        meaning that the image can be reactive
        to the situation in which it is also being consumed.</p>
</article>

<article>
    <p>1</p>
    <p>Another thing about programming is that logic can be implemented in any layer, position and time step.</p>
    <p>With logic, a changing input variable can be transformed into behavior.</p>
</article>

<article>
    <p>2</p>
    <p>Another thing about programming is that scale can be achieved comparatively easily.</p>
    <p>When spreading behavior logic, a system of individual agents can be created, each executing their own input variables in real time. Encapsulated or in cooperation with their peer agents, they form complex networks.</p>
    <p>These could be pixels on a screen, devices in a circle, people in a room.</p>
    <p>All orchestrated by the algorithm.</p>
</article>

<style>

    

    article {
        color: white;
        font-size: 2rem;
        margin: 6rem auto;
    }
    article p {
        margin: 1em 0;
        line-height: 1.4;
    }
    button {
        background-color: #333;
        color: black;
        font-size: 1rem;
        height: 2rem;
        padding: 0.2rem 1rem;
        border-radius: 2rem;
        transition: background-color 200ms ease;
        margin: 0.2em;
    }
    button:hover {
        background-color: #00f;
    }
    p button {
        display: inline-block;
        transform: translateY(-0.4em);
    }

</style>