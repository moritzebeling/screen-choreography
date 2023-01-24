<script>
    
    import { page } from "$app/stores";
    import Menu from "$lib/Menu.svelte";

</script>

<main class="layout">

    <div class="text">
        <p>On iPhone, go to Settings > Display & Brightness</p>
        <ol>
            <li>Turn up your screen brightness to the maximum.</li>
            <li>Set the Auto-Lock time to »never« so your display stays on.</li>
            <li>You may have to switch off Low Power mode.</li>
        </ol>
    </div>

    <Menu>
        <a class="button" href="/live/{$page.params.room}">Close</a>
    </Menu>
    
</main>

<style>

    .text {
        padding: 1rem;
        flex: 1;
    }
    ol {
        font-size: 2rem;
        margin: 1rem 0 1rem 3.5rem;
    }
    ol li {
        list-style-type: decimal;
        margin: 1rem 0;
    }

</style>