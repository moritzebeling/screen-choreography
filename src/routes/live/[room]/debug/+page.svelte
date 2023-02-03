<script>

    import { userStore, roomStore, sceneStore } from "$lib/stores";
    import { config } from '$lib/config';
    import DebugView from "$lib/debug/DebugView.svelte";
    import { page } from "$app/stores";

    /** @type {import('./$types').LayoutServerData} */
    export let data;

</script>

<svelte:head>
    <title>{config.title} (Debug {$roomStore.title})</title>
</svelte:head>

<DebugView closeHref="/live/{$page.params.room}">

    <pre>User {JSON.stringify($userStore, null, 4)}</pre>
    <pre>Room {$roomStore.json( !$roomStore.isAdmin( data.user.id ) )}</pre>
    <pre>Scene {JSON.stringify($sceneStore, null, 4)}</pre>
        
</DebugView>

<style>
</style>