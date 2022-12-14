<script>

    import { io, users } from "$lib/realtime";

    let pressed = 0;
    let fingerDown = false;

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

</script>

<main
    on:pointerdown={down}
    on:pointerup={up}
    style="background-color:rgb(0,0,{($users.pressed/$users.mobile)*255});"
    class:effect={fingerDown && $users.pressed >= $users.mobile}
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