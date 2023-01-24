<script>

    const allowEntering = true;
    const allowCreating = true;

    /* todo: get list of open rooms from server */
    let openRooms = [{
        id: 'test',
        users: 2
    }];

</script>

<div class="layout">

    <header>
        <h1>Screens Choreography</h1>
    </header>

    {#if allowCreating}
        <main>
            <nav>
                <a class="button" href="/live/new">Open new room</a>
            </nav>
        </main>
    {/if}

    {#if allowEntering}
        <footer>
            <p>Or join one of the following rooms:</p>
            <nav>
                {#each openRooms as {id, users}}
                    <a class="button" href="/live/{id}">
                        {id}
                        ({users} users)
                    </a>
                {/each}
            </nav>
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