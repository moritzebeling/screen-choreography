<script>

    import Menu from "$lib/Menu.svelte";
    import { roomStore } from "$lib/stores";
    import { onMount } from "svelte";
    import { socket } from "../../../socket.js";
    import { slug } from "$lib/helpers";
    import { page } from "$app/stores";
    import { config } from "$lib/config";

    /** @type {import('./$types').LayoutServerData} */
    export let data;

    let id = $page.params.room;
    let title = $roomStore.title;
    let password = $roomStore.password;

    roomStore.subscribe( room => {
        title = room.title;
        password = room.password;
    });

    let pending = false;

    function validate( title = '', password = '' ){
        if( slug( title || '' ).length < 3 ){
            return false;
        } else if( (password || '').length < 3 ){
            return false;
        }
        return true;
    }
    $: valid = validate( title, password );

    function save(){
        pending = true;
        console.log('room:update', { id, title, password });
        socket.emit("room:update",{ id, title, password });
    }
    
    onMount(()=>{
        socket.on('room:update', room => {
            console.log('room:update', room);
            pending = false;
        });
    });

</script>

<svelte:head>
    <title>{config.title} (Settings {$roomStore.title})</title>
</svelte:head>

<form class="layout">
    <div class="bar">
        <h1>Room settings for »{title}«</h1>
        <p>{$page.url.origin}/live/{id}</p>
    </div>
    <main>

        <label for="title">
            <p>Room title</p>
            <input type="text" disabled="{pending ? true : false}" name="title" id="title" required minlength="3" maxlength="32" bind:value={title} />
        </label>

        <label for="password">
            <p>Password for controlling</p>
            <input type="text" disabled="{pending ? true : false}" name="password" id="password" required minlength="3" bind:value={password} />
        </label>
    
    </main>
    <div>
        <Menu fixed={true}>
            {#if valid}
                {#if pending}
                    <button class="button" title="Please wait" on:click|preventDefault>Please wait...</button>
                {:else}
                    <button class="button" on:click|preventDefault={save}>Save</button>
                {/if}
            {:else}
                <button disabled class="button" title="Please enter a room number and password" on:click={()=> alert('Please enter a room number and password')}>Save</button>
            {/if}
            <a class="button subtle" href="{$roomStore.url()}">Cancel</a>
        </Menu>
    </div>
</form>

<style>

    form {
        text-align: center;
        justify-content: space-between;
    }

    label {
        margin: 2rem 0;
        display: block;
    }
    label p {
        margin: 0.5rem 0;
    }
    input {
        width: 20rem;
        cursor: pointer;
        padding: 0.5em 1em;
        border-radius: 2em;
        background-color: #222;
        color: white;
        transition: background-color 200ms ease;
        text-align: inherit;
    }

</style>