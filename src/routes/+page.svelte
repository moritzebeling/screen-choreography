<script>   

    let live = [
        {
            title: 'Test',
            id: 'test'
        }
    ];

    let performance = [
        {
            title: 'Class Meeting',
            id: '1-class-meeting'
        },
        {
            title: 'HFBK Annual Show 2023',
            id: '2-annual-show'
        },
    ];

</script>

<main>

    <h1>Screens Choreography</h1>

    <nav>

        <a href="/debug">Debug</a>

        {#each live as {title, id}}
            <a href="/live/{id}">Live room »{title}«</a>
        {/each}
        
        {#each performance as {title, id}}
            <a href="/performance/{id}">Performance »{title}«</a>
        {/each}

    </nav>

</main>

<style>

    main {
        margin: 1rem;
    }
    h1 {
        margin-bottom: 1rem;
    }
    nav a {
        display: block;
    }

</style>