<script>

    import { page } from "$app/stores";
    import { config } from "$lib/config";
    import { roomStore } from "$lib/stores";
    
    import Menu from "$lib/Menu.svelte";

    /** @type {import('./$types').LayoutServerData} */
    export let data;

</script>

<svelte:head>
    <title>{config.title} (Room {$roomStore.title})</title>
</svelte:head>

<Menu fixed={true}>
    <a class="button" href="{$page.url.href}/instructions">Instructions</a>
    <a class="button" href="{$page.url.href}/invite">Invite</a>
    <a class="button" href="{$page.url.href}/debug">Debug</a>
    {#if $roomStore.allowedToTakeover( data.user.id )}
        <a class="button" href="{$page.url.href}/control">Control</a>
    {/if}
</Menu>