<script>

    import { page } from "$app/stores";
    import { config } from "$lib/config";
    import QRCode from 'qrcode';
    import { setGlobalStyleVariables } from "$lib/helpers.js";
    import { onMount } from "svelte";
    import { socket } from "../socket.js";
    import { goto } from "$app/navigation";
    import { roomStore, userStore } from "$lib/stores.js";
    import { Room } from "$lib/models/Room.js";

    export let data;

    let url = String( $page.url );

    function printQrCode( figure ){
        let canvas = figure.querySelector('canvas');
        let size = Math.min(
            figure.clientWidth,
            figure.clientHeight, 
        );
        let options = {
            width: size,
            height: size,
        };
        QRCode.toCanvas(canvas, url, options, function (error) {
            if (error) console.error(error);
        })
    }

    onMount(()=>{
        setGlobalStyleVariables({
            '--background': 'white',
        });
        socket.emit('room:enter');
        socket.on('room:updated', room => {

            room = new Room( room );
            roomStore.set( room );

            $userStore.setPosition( room.getUserPosition( $userStore.id, true ) );

            if( room.users.length > ($userStore.position+1) ){
                console.log('room:updated', 'next user has entered');
                goto('/performance/hfbkja23');
            } else {
                console.log( 'room:updated', $roomStore, $userStore );
            }

        });
    });

</script>

<svelte:head>
    <title>Invite to {config.title}</title>
</svelte:head>

<main class="layout">
    <figure use:printQrCode title={url}>
        <canvas width="100" height="100"></canvas>
    </figure>
</main>

<style>
    
    main {
        background-color: white;
    }

    figure {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    canvas {
        display: block;
        width: auto !important;
        height: var(--100vh) !important;
    }
    @media (orientation: portrait){
        canvas {
            width: 100% !important;
            height: auto !important;
        }
    }

</style>