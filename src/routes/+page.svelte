<script>
  
    import { duration, seconds, time } from "$lib/system";

    let choreographies = [
    ];
    
</script>

<header>
    <h1>Client Choreography</h1>
    <nav>
        {#each choreographies as link}
            <a href="/{link}">{link}</a>
        {/each}
    </nav>
</header>

<main>
    <p>{$seconds}</p>
</main>

<aside>
    <p>{$time}</p>
</aside>

<style>

    header {
        padding: 1rem;
        position: fixed;
        top: 0;
        left: 0;
    }

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

    aside {
        padding: 1rem;
        position: fixed;
        bottom: 0;
        left: 0;
    }

</style>