<script>
    
    import { page } from "$app/stores";

    let open = true;

    function toggle(){
        open = !open;
    }

</script>

<div class="container" class:open>
    {#if open}
        <nav>
            <a href="/live/{$page.params.room}/invite" class="button">Invite</a>
        </nav>
    {/if}
    <div>
        <button on:click={toggle}></button>
    </div>
</div>

<style>

    .container {
        position: fixed;
        right: 0;
        bottom: 0;
        padding: 1rem;
        mix-blend-mode: difference;
        z-index: 99999999999999;
        text-align: right;
        display: flex;
        align-items: end;
        flex-direction: column;
    }
    .container.open {
        background-color: rgba(0,0,0,0.5);
    }

    a {
        margin-bottom: 5px;
    }

    button {
        display: block;
        cursor: pointer;
        background-color: white;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 1.6rem;
    }

</style>