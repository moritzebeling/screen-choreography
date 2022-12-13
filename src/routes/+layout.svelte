<script>
    
    import { tick } from "$lib/clock";
    import { onMount } from "svelte";
    import { io, user, users } from "$lib/realtime";
    import { currentScene } from "$lib/control";
    import Debug from "$lib/Debug.svelte";
    import { random } from "$lib/helpers";

    function cssVariables(){
        let vh = window.innerHeight;
        document.documentElement.style.setProperty('--100vh', `${vh}px`);
    }

    onMount(()=>{
        tick();
        cssVariables();
        io.emit("connectUser");
        io.on("userUpdated", data => {
            user.set( data );
        });
        io.on("usersUpdated", data => {
            users.set( data );
        });
        io.on("sceneSet", data => {
            currentScene.set( data );
        });
        io.on("refresh", () => {
            setTimeout(() => {
                location.reload();
            }, random(50,500));
        });
    });
    
</script>

<svelte:window on:resize={cssVariables} />

<Debug />

<slot />