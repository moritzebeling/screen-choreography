<script>
    
    import { config } from "$lib/config";
    import Menu from "$lib/Menu.svelte";

    import { afterNavigate } from '$app/navigation';

    let previousPage = '/';
    afterNavigate(({from}) => {
        previousPage = from?.url.pathname || previousPage || '/';
    }) 

</script>

<main class="layout">

    <div class="text">
        <p>Please consider supporting this project with 1€</p>
        <Menu>
            <a class="button" href="{config.support}" target="_blank" rel="noreferrer noopener nofollow">PayPal</a>
        </Menu>
    </div>

    <Menu>
        <a class="button" href="{previousPage}">Close</a>
    </Menu>
    
</main>

<style>

    main {
        text-align: center;
        mix-blend-mode: difference;
    }
    .text {
        justify-content: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
        flex: 1;
    }
    p {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

</style>