<script>
    
    import { scenes } from "$lib/control";

    import ControlButton from "$lib/ControlButton.svelte";

</script>

<nav>
    {#each scenes as scene, i}
        <ControlButton {scene} />
    {/each}
</nav>

<main>
        
    <section id="0">
        
        <p>
            <ControlButton id={3}>One thing</ControlButton> about programming
            as a tool for creating visual images is,
            that the result we see is being created in that very moment.</p>
        
        <p>
            When looking at other forms of media:
            a video, a painting, a static design,
            production and presentation are inherently separated processes.</p>

        <p>
            Through the continuous iteration of computing and rendering,
            a programmed visual can be <ControlButton id={4}>altered</ControlButton>
            by input that is being created or updated during runtime,
            meaning that the image can be reactive
            to the situation in which it is also being consumed.</p>

    </section>
    <section id="1">
        
        <p>
            Another thing about programming is
            that logic can be implemented in any layer, position and time step.</p>

        <ControlButton id={5} />

        <p>
            With logic, a changing input variable
            can be transformed into behavior.</p>

    </section>
    <section id="2">

        <p>
            Another thing about programming
            is that scale can be achieved comparatively easily.</p>
        
        <p>
            When spreading behavior logic,
            a system of individual agents can be created,
            each executing their own input variables in real time.
            Encapsulated or in cooperation with their peer agents,
            they form complex networks.</p>

        <p>
            These could be pixels on a screen,
            devices in a circle,
            people in a room.</p>
        
        <ControlButton id={6} />
        
        <p>All orchestrated by the algorithm.</p>
        
    </section>

</main>

<style>

    nav {
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 1rem;
    }
    nav :global( button ){
        margin: 0.2rem;
    }
    @media (max-width: 600px){
        nav {
            position: static;
        }
    }

    main {
        font-size: 2rem;
        max-width: 900px;
        margin: 2rem auto;
        padding: 1rem;
    }

    main :global( button ){
        font-size: 0.7em;
        padding: 0.15em 0.6em;
        display: block;
        margin: 2rem auto;
        vertical-align: bottom;
        transform: translateY(-0.1em);
    }
    p :global( button ){
        display: inline-block;
        margin: 0 0.1em;
    }

    i {
        display: inline-block;
        width: 1.2em;
        margin-left: -1.2em;
    }

    section {
        padding-left: 1.2em;
        margin: 2rem 0;
        counter-increment: section;
        position: relative;
    }
    section::before {
        content: attr(id);
        position: absolute;
        top: 0;
        left: 0;
    }

    p + p {
        margin-top: 0.5em;
    }

</style>