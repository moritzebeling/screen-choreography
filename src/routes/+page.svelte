<script>
    
    import { socket } from "./socket.js";
    import { onMount } from "svelte";
    import Menu from "$lib/Menu.svelte";
    import { config } from "$lib/config";

    let rooms = [];

    onMount(()=>{
        socket.on('rooms:update', data => {
            rooms = data.filter( room => room.users.length > 0 );
        });
        socket.on('log', data => {
            console.info( data );
        });
        return () => {
            socket.off('rooms:update');
            socket.close();
        }
    });
    
</script>

<svelte:head>
    <title>{config.title}</title>
</svelte:head>

<div class="layout">

    <header>
        <h1>Screens Choreography</h1>
    </header>
    
    <main>
        <p>
            Thursday, 9th 21:30
            <br />
            Saturday, 11th 16:00
            <br />
            Feb 2023
        </p>
        <p>
            Klasse Digitale Grafik
            <br />
            HFBK Hamburg
        </p>
    </main>

    <!-- <main>
        <Menu>
            <a class="button" href="/live">Open new room</a>
        </Menu>
    </main> -->

    <!-- {#if rooms.length > 0}
        <footer>
            <p>Or join one of the following rooms:</p>
            <Menu>
                {#each rooms as room}
                    <a class="button" href="/live/{room.id}">
                        {room.title || room.id}
                        ({room.users.length} users)
                    </a>
                {/each}
            </Menu>
        </footer>
    {/if} -->

</div>

<style>

    .layout {
        text-align: center;
        justify-content: space-between;
    }

    header {
        text-align: center;
    }
    h1 {
        font-size: 2rem;
    }

    header, nav {
        margin: 1rem;
    }
    main {
        /* flex: 1;
        display: flex;
        justify-content: center;
        align-items: center; */
    }
    p {
        margin: 1rem 0;
    }

</style>