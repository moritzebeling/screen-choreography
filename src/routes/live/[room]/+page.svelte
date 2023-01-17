<script>

    import { onMount } from "svelte";
    import { socket } from "$lib/realtime";

    let data = {
        speed: 1000,
        color: { r: 255, g: 255, b: 255 }
    };

    onMount(()=>{
        socket.on("visualUpdated", d => {
            console.log('visual updated', d);
            data = d;
        });
    });

</script>

<main style="
    transition-duration:{data.speed}ms;
    background-color:rgb({data.color.r},{data.color.g},{data.color.b});
    "></main>

<style>

    main {
        height: var(--100vh);
        transition-property: background-color;
        transition-timing-function: ease-in-out;
    }

</style>