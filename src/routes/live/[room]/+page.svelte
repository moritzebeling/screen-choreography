<script>

    import { page } from "$app/stores";

    import Menu from "$lib/Menu.svelte";

</script>

<Menu fixed={true}>
    <a class="button" href="{$page.url.href}/instructions">Instructions</a>
    <a class="button" href="{$page.url.href}/invite">Invite</a>
    <a class="button" href="{$page.url.href}/donate">Donate</a>
    <a class="button" href="{$page.url.href}/debug">Debug</a>
    <a class="button" href="{$page.url.href}/control">Control</a>
</Menu>