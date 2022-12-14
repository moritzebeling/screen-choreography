<script>

    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    onMount(()=>{
        setTimeout(()=>{
            dispatch('continue');
        }, 5000);
    });


</script>

<main transition:fade>
    <h1>This is just an excercise</h1>
</main>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--100vh);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 1rem;
        font-size: 6vw;
        line-height: 1;
    }

    h1 {
        animation: fadeOut 3s ease-in-out;
        animation-delay: 3s;
        animation-fill-mode: both;
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

</style>