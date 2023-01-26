<script>

    import Renderer from "./Renderer.svelte";
    
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import { socketLive as socket } from "$lib/sockets";
    import { random } from "$lib/helpers";

    import { User } from "$lib/models/User";
    import { Room } from "$lib/models/Room";
    import { Scene } from "$lib/models/Scene";

    import { userStore, roomStore, sceneStore } from "$lib/stores";

    onMount(()=>{
        socket.emit("room:enter",{
            roomId: $page.params.room,
            device: User.detectDevice()
        });
        socket.on("user:update", data => {
            let user = new User( data );
            console.log( 'user:update', user );
            userStore.set( user );
        });
        socket.on("room:update", data => {
            let room = new Room( data );
            console.log( 'room:update', room );
            roomStore.set( room );
        });
        socket.on("scene:update", data => {
            let scene = new Scene( data );
            console.log( 'scene:update', scene );
            sceneStore.set( scene );
        });
        socket.on("reload", () => {
            console.warn('Window will reload');
            setTimeout(() => location.reload(), random(50,500));
        });
        socket.on("log", data => {
            console.info( data );
        });
        return ()=>{
            socket.emit("room:leave",{
                roomId: $page.params.room
            });
        };
    });
    
</script>

<Renderer />

<slot />