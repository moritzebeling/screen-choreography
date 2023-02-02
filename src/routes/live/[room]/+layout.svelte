<script>

    import Renderer from "./Renderer.svelte";
    
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import { socket } from "../socket.js";
    import { random } from "$lib/helpers";

    import { Room } from "$lib/models/Room";
    import { Scene } from "$lib/models/Scene";

    import { roomStore, sceneStore } from "$lib/stores";

    onMount(()=>{
        socket.emit('room:enter',{
            id: $page.params.room
        });
        socket.on('room:update', data => {
            let room = new Room( data );
            console.log( 'room:update', room );
            roomStore.set( room );
        });
        socket.on('scene:update', data => {
            let scene = new Scene( data );
            console.log( 'scene:update', scene );
            sceneStore.set( scene );
        });
        socket.on('reload', () => {
            console.warn('Window will reload');
            setTimeout(() => location.reload(), random(50,500));
        });
        socket.on('log', data => {
            console.info( data );
        });
        return ()=>{
            // socket.emit('room:leave');
            // socket.off('room:update');
            // socket.off('scene:update');
            // socket.off('reload');
            // socket.close();
        };
    });
    
</script>

<Renderer />

<slot />