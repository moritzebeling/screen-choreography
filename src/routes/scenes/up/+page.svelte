<script>

    import { seconds } from "$lib/clock";
    import { user, users } from "$lib/realtime";
    import { fade } from "svelte/transition";

    let animating = false;
    $: speed = $users.ordered * 2000;
    $: delay = ($user.num/$users.ordered)*speed;

    function switchTarget( s ){
        if( s % 2 === 0 ){
            animating = true;
        }
    }

    $: switchTarget( $seconds );

</script>

{#if animating}
    <main transition:fade>
        <div class:animating style="--speed:{speed}ms; animation-delay:{delay}ms;"></div>
    </main>
{/if}

<style>

    div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--100vh);
    }
    div.animating {
        animation: circle var(--speed) linear;
        animation-iteration-count: infinite;
    }

    @keyframes circle {
        0%, 100% {
            background-color: rgb(0,0,255);
        }
        16% {
            background-color: rgb(255,0,255);
        }
        32% {
            background-color: rgb(255,0,0);
        }
        48% {
            background-color: rgb(255,255,0);
        }
        64% {
            background-color: rgb(0,255,0);
        }
        80% {
            background-color: rgb(0,255,255);
        }
    }

</style>