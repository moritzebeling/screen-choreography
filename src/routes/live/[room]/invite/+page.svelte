<script>
    
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import QRCode from 'qrcode';

    console.log( $page.url );

    let url = `${$page.url.origin}/live/${$page.params.room}`;

    function printQrCode( canvas ){
        let size = Math.min( canvas.offsetWidth, canvas.offsetHeight );
        let options = {
            width: size,
            height: size,
        };
        QRCode.toCanvas(canvas, url, options, function (error) {
            if (error) console.error(error)
        })
    }

</script>

<svelte:window on:click={()=>goto(url)} />

<main>

    <figure class="qr">
        <canvas use:printQrCode></canvas>
    </figure>

    <p>{url}</p>

</main>

<style>

    main {
        height: var(--100vh);
        background-color: white;
        color: black;
        display: flex;
        flex-direction: column;
    }

    figure {
        flex: 1;
        padding: 1rem;
        text-align: center;
    }

    canvas {
        width: 100%;
        height: 100%;
    }

    p {
        text-align: center;
        padding: 1rem;
    }

</style>