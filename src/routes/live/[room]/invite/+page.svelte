<script>
    
    import { page } from "$app/stores";
    import QRCode from 'qrcode';

    function printQrCode( canvas ){
        let size = Math.min( canvas.offsetWidth, canvas.offsetHeight );
        let options = {
            width: size,
            height: size,
        };
        QRCode.toCanvas(canvas, $page.url.href, options, function (error) {
            if (error) console.error(error)
        })
    }

</script>

<main>

    <figure class="qr">
        <canvas use:printQrCode></canvas>
    </figure>

    <p>{$page.url.href}</p>

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