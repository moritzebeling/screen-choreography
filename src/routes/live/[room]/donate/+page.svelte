<script>
    
    import { page } from "$app/stores";
    import { config } from "$lib/config";
    import Menu from "$lib/Menu.svelte";

</script>

<main class="layout">

    <div class="text">
        <p>Please consider supporting this project by donating 1€ via PayPal</p>
        <Menu>
            <a class="button" href="{config.donate}" target="_Blank" rel="noreferrer noopener nofollow">PayPal</a>
        </Menu>
    </div>

    <Menu>
        <a class="button" href="/live/{$page.params.room}">Close</a>
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