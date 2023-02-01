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
        mix-blend-mode: difference;
        flex-wrap: wrap;
        z-index: -1;
    }
    .fingerprint div {
        width: 10vw;
        height: 10vw;
        border-radius: 50%;
        background: currentColor;
    }
    .fingerprint div.small {
        transform: scale(0.5);
    }

</style>