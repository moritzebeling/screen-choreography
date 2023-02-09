<script>
    
    import { socket } from "./socket.js";
    import { onMount } from "svelte";
    import { User } from "$lib/models/User";
    import { userStore, roomStore } from "$lib/stores";
    import { Room } from "$lib/models/Room";

    /** @type {import('./$types').LayoutServerData} */
    export let data;

    onMount(()=>{

        let user = new User({
            ...data.user,
            id: data.userId
        });
        user.detectTouch();
        userStore.set( user );
        console.log( $userStore );

        socket.on('room:update', room => {
            console.log('room:update', room);
            room = new Room( room );
            roomStore.set( room );
            $userStore.position = room.getUserPosition( $userStore.id, true );
            console.log('room:update', $roomStore, $userStore.position );
        });
        
    });
    
</script>

<slot />

<style>
    pre {
        margin: 1rem;
    }
</style>