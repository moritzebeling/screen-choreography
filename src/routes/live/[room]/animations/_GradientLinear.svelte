<script>

    import { onMount } from "svelte";
    import { syncAnim } from "$lib/helpers";

    let animating = false;
    onMount(async ()=>{
        animating = await syncAnim( 2000 );
    });

</script>

<main class:animating>
    <div></div>
    <div></div>
</main>

<style>

    main {
        position: fixed;
        top: 0;
        left: -100vw;
        width: 200vw;
        height: var(--100vh);
        display: flex;
        transition: opacity 1s ease;
        opacity: 0;
    }
    main.animating {
        opacity: 1;
        animation: slide 2s linear;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        animation-direction: normal;
    }
    
    main div {
        flex: 1;
        background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 100%
        );
    }

    @keyframes slide {
        0% {
            transform: translateX(0vw);
        }
        100% {
            transform: translateX(100vw);
        }
    }

</style>