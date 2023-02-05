<script>
    
    import { roomStore, userStore } from "$lib/stores";
    import Login from "./login/Login.svelte";
    import Settings from "./settings/Settings.svelte";

</script>

{#if $roomStore.isAdmin( $userStore.id )}
    <slot />
{:else}
    {#if !$roomStore.password}
        <Settings />
    {:else}
        <Login />
    {/if}
{/if}