<script>
    
    import { tick } from "$lib/clock";
    import { onMount } from "svelte";
    import { socket, user, users } from "$lib/realtime";
    import { currentScene } from "$lib/control";
    import Debug from "$lib/Debug.svelte";
    import { isTouchDevice, random } from "$lib/helpers";

    function cssVariables(){
        let vh = window.innerHeight;
        document.documentElement.style.setProperty('--100vh', `${vh}px`);
    }

    onMount(()=>{
        tick();
        cssVariables();
        socket.emit("connectUser",{
            mobile: isTouchDevice()
        });
        socket.on("userUpdated", data => {
            user.set( data );
        });
        socket.on("usersUpdated", data => {
            users.set( data );
        });
        socket.on("sceneSet", data => {
            currentScene.set( data );
        });
        socket.on("refresh", () => {
            setTimeout(() => {
                location.reload();
            }, random(50,500));
        });
        socket.on("testLog", data => {
            console.log( 'testLog', data );
        });
    });
    
</script>

<svelte:window on:resize={cssVariables} />

<Debug />

<slot />