<script>
  
    import { duration, seconds, time } from "$lib/system";
    import Text from "$lib/Text.svelte";

    let choreographies = [
        'one',
        'two',
    ];
    
</script>

<Text>
    <h1>Client Choreography</h1>
    <nav>
        {#each choreographies as link}
            <a href="/{link}">{link}</a>
        {/each}
    </nav>
</Text>

<main>
    <p>{$seconds}</p>
</main>

<Text position="bottom">
    <p>{$time}</p>
    <p>{$duration}</p>
    <p>{$seconds}</p>
</Text>

<style>

    nav {
        display: flex;
        gap: 0.5em;
    }

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 10vw;
    }

</style>