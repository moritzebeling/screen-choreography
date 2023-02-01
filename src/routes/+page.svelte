<script>
    
    import { socketHome as socket } from "$lib/sockets";
    import { onMount } from "svelte";
    import Menu from "$lib/Menu.svelte";
    import { config } from "$lib/config";

    let rooms = [];

    onMount(()=>{
        socket.on('rooms:update', data => {
            rooms = data;
        });
        socket.on('log', data => {
            console.info( data );
        });
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
            <a class="button" href="/live/new">Open new room</a>
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