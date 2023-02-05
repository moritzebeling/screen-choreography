<script>

    import { seconds } from "$lib/clock";

</script>

<main>
    <div class:small={$seconds % 2 > 0}></div>
    <div class:small={$seconds % 3 > 0}></div>
    <div class:small={$seconds % 5 > 0}></div>
    <div class:small={$seconds % 7 > 0}></div>
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
        gap: 2rem;
        flex-wrap: wrap;
        z-index: -1;
    }
    main div {
        width: 15vh;
        height: 15vh;
        border-radius: 50%;
        background: currentColor;
        transition: transform 200ms ease-in-out;
    }
    @media (orientation: portrait) {
        main {
            flex-direction: column;
        }
        main div {
            width: 15vw;
            height: 15vw;
        }
    }
    main div.small {
        transform: scale(0.5);
    }

</style>