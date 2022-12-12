<script>

    import { seconds } from "$lib/clock";

    let animating = false;

    function switchTarget( s ){
        if( s % 2 === 1 ){
            animating = true;
        }
    }

    $: switchTarget( $seconds );

</script>

<div class="first" class:animating></div>
<div class="second" class:animating></div>

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
        animation: slide 2s ease-in-out;
        animation-iteration-count: infinite;
        background: linear-gradient(0, rgba(0,0,0,1) 0%, rgba(0,0,255,1) 100%);
    }
    div.second {
        animation-delay: 1s;
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