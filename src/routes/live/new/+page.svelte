<script>

    import Menu from "$lib/Menu.svelte";
    import { onMount } from "svelte";
    import { socketLive as socket } from "$lib/sockets";
    import { slug } from "$lib/helpers";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { config } from "$lib/config";

    /** @type {import('./$types').LayoutServerData} */
    export let data;

    let title;
    let password;
    let id;

    let pending = false;
    let exists = false;

    function validate( title = '', password = '' ){
        id = slug( title );
        if( id.length < 3 ){
            return false;
        } else if( password.length < 3 ){
            return false;
        }
        return true;
    }
    $: valid = validate( title, password );

    function create(){
        pending = true;
        socket.emit("room:create",{
            roomId: id,
            password: password,
            title: title
        });
    }

    onMount(()=>{
        socket.on('room:created', room => {
            console.log('room:created', room);
            goto( `/live/${room.id}` );
        });
        socket.on('room:exists', room => {
            console.log('room:exists', room);
            pending = false;
            exists = true;
        });
    });

    function reset(){
        title =  undefined;
        password =  undefined;
        id =  undefined;
        pending = false;
        exists = false;
    }

</script>

<svelte:head>
    <title>{config.title} (Create {title || 'new room'})</title>
</svelte:head>

<form class="layout">
    <div class="bar">
        <h1>Create a new room</h1>
        <p>
            {#if id}
                {$page.url.origin}/live/{id}
            {:else}&nbsp;{/if}
        </p>
    </div>
    <main>
        {#if exists}
            <p>The room »{title}« already exists.</p>
        {:else}

            <label for="title">
                <p>Room title</p>
                <input type="text" disabled="{pending ? true : false}" name="title" id="title" required minlength="3" maxlength="32" bind:value={title} />
            </label>

            <label for="password">
                <p>Password for controlling</p>
                <input type="text" disabled="{pending ? true : false}" name="password" id="password" required minlength="3" bind:value={password} />
            </label>
        
        {/if}
    </main>
    <Menu>
        {#if exists}
            <button class="button" on:click|preventDefault={reset}>Enter other room name</button>
            <a class="button" href="/live/{id}">Join room »{title}« anyway</a>
        {:else}
            {#if valid}
                {#if pending}
                    <button class="button" title="Please wait" on:click|preventDefault>Please wait...</button>
                {:else}
                    <button class="button" on:click|preventDefault={create}>Create</button>
                {/if}
            {:else}
                <button disabled class="button" title="Please enter a room number and password" on:click={()=> alert('Please enter a room number and password')}>Create</button>
            {/if}
        {/if}
        <a class="button subtle" href="/">Cancel</a>
        <a class="button subtle" href="/support">1€</a>
    </Menu>
</form>

<style>

    form {
        text-align: center;
        justify-content: space-between;
    }
    .bar {
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