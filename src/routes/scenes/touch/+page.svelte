<script>
    
    import { onMount } from "svelte";
    import { isTouchDevice } from "$lib/helpers";
    import { io, users } from "$lib/realtime";

    let pressed = 0;
    let fingerDown = false;
    let isMobile = false;
    
    onMount(()=>{
        isMobile = isTouchDevice();
    });

    function down(){
        io.emit("fingerDown");
        fingerDown = true;
        pressed++;
    }
    function up(){
        io.emit("fingerUp");
        fingerDown = false;
        pressed--;
    }

    $: effect = ( (isMobile && fingerDown) || (!isMobile) ) && ( $users.pressed > 2 && $users.pressed >= $users.mobile );

</script>

<main
    on:touchstart={down}
    on:touchend={up}
    style="background-color:rgb(0,0,{($users.pressed/$users.mobile)*255});"
    class:effect
    >
</main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--100vh);
        transition: background-color 500ms ease;
        -webkit-user-select: none;
        user-select: none;
    }
    main.effect {
        animation: effect 400ms linear infinite;
    }

    @keyframes effect {
        0%, 100% {
            background-color: rgb(0,0,255);
        }
        16% {
            background-color: rgb(255,0,255);
        }
        32% {
            background-color: rgb(255,0,0);
        }
        48% {
            background-color: rgb(255,255,0);
        }
        64% {
            background-color: rgb(0,255,0);
        }
        80% {
            background-color: rgb(0,255,255);
        }
    }

</style>