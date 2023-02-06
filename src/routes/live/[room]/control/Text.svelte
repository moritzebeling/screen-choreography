<script>

    import { sceneStore } from "$lib/stores";

</script>

<label class="container">

    <input type="text" placeholder="Text" bind:value={$sceneStore.text} />

</label>

<style>

    label {
        position: relative;
        height: 100%;
        display: block;
    }
    input {
        background: transparent;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 2rem;
    }
    input::placeholder {
        color: inherit;
        opacity: 0.4;
    }
    input:focus {
        outline: none;
    }

</style>