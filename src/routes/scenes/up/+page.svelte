<script>

    import { seconds } from "$lib/clock";

    let animating = false;

    function switchTarget( s ){
        if( s % 4 === 1 ){
            animating = true;
        }
    }

    $: switchTarget( $seconds );

</script>

<div class="first" class:animating></div>
<div style="animation-delay: 4s;" class:animating></div>
<div style="animation-delay: 8s;" class:animating></div>
<div style="animation-delay: 12s;" class:animating></div>

<style>

    div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--100vh);
        transform: translateY(var(--100vh));
    }
    div.animating {
        animation: slide 16s ease-in-out;
        animation-iteration-count: infinite;
        background: linear-gradient(0, rgba(0,0,0,1) 0%, rgba(0,0,255,1) 100%);
    }

    @keyframes slide {
        from {
            transform: translateY(var(--100vh));
        }
        to {
            transform: translateY(-150vh);
        }
    }

</style>