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
        <Menu>
            <a class="button" href="/live">Open new room</a>
        </Menu>
    </main>

    {#if rooms.length > 0}
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
    {/if}

</div>

<style>

    .layout {
        text-align: center;
        justify-content: space-between;
    }

    header, nav {
        margin: 1rem;
    }
    main {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>