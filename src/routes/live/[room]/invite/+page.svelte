<script>
    
    import { page } from "$app/stores";
    import Menu from "$lib/Menu.svelte";
    import QRCode from 'qrcode';

    let url = `${$page.url.origin}/live/${$page.params.room}`;

    function printQrCode( figure ){
        let canvas = figure.querySelector('canvas');
        let size = Math.min(
            figure.clientWidth,
            figure.clientHeight, 
        );
        console.log( size );
        let options = {
            width: size,
            height: size,
        };
        QRCode.toCanvas(canvas, url, options, function (error) {
            if (error) console.error(error);

        })
    }

</script>

<main class="layout">

    <div class="bar">
        {url}
    </div>

    <figure use:printQrCode>
        <a href="{url}">
            <canvas width="100" height="100"></canvas>
        </a>
    </figure>

    <div>
        <Menu>
            <a class="button" href="/live/{$page.params.room}">Close</a>
        </Menu>
    </div>

</main>

<style>

    main {
        background-color: white;
        color: black;
        text-align: center;
    }
    
    figure {
        flex: 1;
    }

    a {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    canvas {
        display: block;
    }

</style>