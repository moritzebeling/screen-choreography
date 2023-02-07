<script>
    
    import { socket } from "./socket.js";
    import { onMount } from "svelte";
    import { User } from "$lib/models/User";
    import { userStore, roomStore } from "$lib/stores";
    import { Room } from "$lib/models/Room";

    /** @type {import('./$types').LayoutServerData} */
    export let data;

    onMount(()=>{

        socket.emit('room:enter');

        let user = new User({
            ...data.user,
            id: data.userId
        });
        user.detectTouch();
        userStore.set( user );
        console.log( $userStore );

        socket.on('room:updated', room => {
            room = new Room( room );
            roomStore.set( room );
            $userStore.position = room.getUserPosition( $userStore.id, true );
            console.log('room:updated', $roomStore, $userStore.position );
        });
        
        socket.on('room:reset', room => {
            let timeout = 100 + (($userStore.position || 0) * 100);
            setTimeout(()=>{
                socket.emit('room:enter');
            }, timeout);
        });
        
    });
    
</script>

<slot />

<style>
    pre {
        margin: 1rem;
    }
</style>