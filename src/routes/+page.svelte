<script>
  
    import { duration, seconds, time } from "$lib/clock";
    import Text from "$lib/Text.svelte";
    
</script>

<Text>
    <h1>Client Choreography</h1>
    <a href="/scenes">Start</a>
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