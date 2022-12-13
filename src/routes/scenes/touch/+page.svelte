<script>

    import { users } from "$lib/realtime";

    /* @todo get number of touch devices who have pressed */
    let pressed = 0;
    
    let fingerDown = false;

    function down(){
        fingerDown = true;
        pressed++;
    }
    function up(){
        fingerDown = false;
        pressed--;
    }

</script>

<main
    on:pointerdown={down}
    on:pointerup={up}
    style="background-color:rgb(0,0,{20+(pressed/$users)*235});"
    class:effect={fingerDown && $users <= pressed}
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
    }
    main.effect {
        animation: effect 500ms linear infinite;
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