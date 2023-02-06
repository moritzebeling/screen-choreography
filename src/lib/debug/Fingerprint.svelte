<script>

    import { seconds } from "$lib/clock";

</script>

<div class="fingerprint">
    <div class:small={$seconds % 2 > 0}></div>
    <div class:small={$seconds % 3 > 0}></div>
    <div class:small={$seconds % 5 > 0}></div>
    <div class:small={$seconds % 7 > 0}></div>
</div>

<style>

    .fingerprint {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--100vh);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;
        z-index: -1;
    }
    .fingerprint div {
        width: 15vh;
        height: 15vh;
        border-radius: 50%;
        background: currentColor;
    }
    @media (orientation: portrait) {
        .fingerprint {
            flex-direction: column;
        }
        .fingerprint div {
            width: 15vw;
            height: 15vw;
        }
    }
    .fingerprint div.small {
        transform: scale(0.5);
    }

</style>