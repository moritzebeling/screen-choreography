<script>

    import Menu from "$lib/Menu.svelte";
    import { roomStore } from "$lib/stores";
    import { onMount } from "svelte";
    import { socket } from "../../../socket.js";
    import { page } from "$app/stores";
    import { config } from "$lib/config";

    /** @type {import('./$types').LayoutServerData} */
    export let data;

    let id = $page.params.room;
    let password;

    let pending = false;

    function login(){
        pending = true;
        console.log('room:login', password );
        socket.emit("room:login", password );
    }
    
    onMount(()=>{
        socket.on('room:update', room => {
            console.log('room:update', room);
            pending = false;
        });
    });

</script>

<svelte:head>
    <title>{config.title} (Login {$roomStore.title})</title>
</svelte:head>

<form class="layout">
    <div class="bar">
        <h1>Login to »{$roomStore.title}«</h1>
        <p>{$page.url.origin}/live/{id}</p>
    </div>
    <main>

        <label for="password">
            <p>Password</p>
            <input type="text" disabled="{pending ? true : false}" name="password" id="password" required minlength="3" bind:value={password} />
        </label>
    
    </main>
    <div>
        <Menu fixed={true}>
            {#if pending}
                <button class="button" title="Please wait" on:click|preventDefault>Please wait...</button>
            {:else}
                <button class="button" on:click|preventDefault={login}>Login</button>
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