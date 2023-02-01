<script>
    
    import { page } from "$app/stores";
    import { config } from "$lib/config";
    import Menu from "$lib/Menu.svelte";
    import { roomStore } from "$lib/stores";
    import QRCode from 'qrcode';

    function printQrCode( figure ){
        let canvas = figure.querySelector('canvas');
        let url = $page.url.origin + '/live/' + $page.params.room;
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

</script>

<svelte:head>
    <title>{config.title} (Invite to {$roomStore.title})</title>
</svelte:head>

<main class="layout">

    <div class="bar">
        {#if $roomStore}
            {#if $roomStore.users.length === 1}
                <p>Please join me</p>
            {:else}
                <p>{$roomStore.users.length} people are waiting for you</p>
            {/if}
        {/if}
        <p>
            <a href="{$page.url.origin}/live/{$page.params.room}">{$page.url.origin}<wbr />/live/{$page.params.room}</a>
        </p>
    </div>

    <figure use:printQrCode>
        <canvas width="100" height="100"></canvas>
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
        display: flex;
        justify-content: center;
        align-items: center;
    }

    canvas {
        display: block;
    }

</style>