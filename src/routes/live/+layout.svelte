<script>
    
    import { onMount } from "svelte";
    import { userStore } from "$lib/stores";
    import { User } from "$lib/models/User";

    /** @type {import('./$types').LayoutServerData} */
    export let data;

    onMount(()=>{

        let user = new User(data.user);
        user.detectTouch();
        userStore.set( user );
        
    });
    
</script>

<slot />