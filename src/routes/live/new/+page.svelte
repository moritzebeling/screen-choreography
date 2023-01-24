<script>

    import Menu from "$lib/Menu.svelte";
    import { slug } from "$lib/helpers";
    import { page } from "$app/stores";

    let title;
    let password;
    let id;

    function validate( title = '', password = '' ){
        id = slug( title );
        // todo: check if id already exists
        if( id.length < 3 ){
            return false;
        } else if( password.length < 3 ){
            return false;
        }
        return true;
    }
    $: valid = validate( title, password );

    function create(){
        // todo: create new room
    }

</script>

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

        <label for="title">
            <p>Room title</p>
            <input type="text" name="title" id="title" required minlength="3" maxlength="32" bind:value={title} />
        </label>

        <label for="password">
            <p>Password for controlling</p>
            <input type="text" name="password" id="password" required minlength="3" bind:value={password} />
        </label>

    </main>
    <Menu>
        {#if valid}
            <button class="button" on:click|preventDefault={create}>Create</button>
        {:else}
            <button disabled class="button" title="Please enter a room number and password" on:click={()=> alert('Please enter a room number and password')}>Create</button>
        {/if}
        <a class="button subtle" href="/">Cancel</a>
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