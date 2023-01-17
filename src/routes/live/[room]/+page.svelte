<script>

    import { onMount } from "svelte";
    import { socket } from "$lib/realtime";
    import { page } from "$app/stores";
    import { sceneStore } from "./store.js";
    import { Scene } from "$lib/models/Scene.js";

    import Menu from "$lib/Menu.svelte";
    import Renderer from "./Renderer.svelte";

    onMount(()=>{
        socket.on("updateScene", data => {
            let scene = new Scene(data);
            sceneStore.set(scene);
            console.log('updateScene', scene);
        });
    });

</script>

<Renderer />

<Menu fixed={true}>
    <a class="button" href="{$page.url.href}/invite">Invite</a>
    <a class="button" href="{$page.url.href}/control">Control</a>
</Menu>

<style>
</style>