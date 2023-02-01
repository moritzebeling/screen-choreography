<script>

    import { page } from "$app/stores";
    import { config } from "$lib/config";
    import { roomStore } from "$lib/stores";

    import Menu from "$lib/Menu.svelte";

</script>

<svelte:head>
    <title>{config.title} (Room {$roomStore.title})</title>
</svelte:head>

<Menu fixed={true}>
    <a class="button" href="{$page.url.href}/instructions">Instructions</a>
    <a class="button" href="{$page.url.href}/invite">Invite</a>
    <a class="button" href="{$page.url.href}/debug">Debug</a>
    <a class="button" href="{$page.url.href}/control">Control</a>
</Menu>