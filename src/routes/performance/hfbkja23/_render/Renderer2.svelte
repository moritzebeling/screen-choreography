<script>

    import { performanceStore } from "$lib/stores";
    import { syncAnim } from "$lib/helpers.js";
    import { onMount } from "svelte";

    export let userPosition = 0;
    export let totalUsers = 1;

    let scene = {...$performanceStore};
    let state = 0;

    class Rotation {
        constructor(){
            this.running = false;
        }
        sync( precision = 1000 ) {
            let now = Date.now();
            let startAt = Math.ceil( now / precision ) * precision;
            let timeout = startAt - now;
            let id = Math.floor( startAt / precision );
            return new Promise((resolve) => {
                setTimeout(() => resolve( id ), timeout);
            });
        }
        async tick (){
            state = await this.sync( scene.interval );
            if( this.running ){
                this.tick();
            }
        }
        start(){
            this.running = true;
            this.tick();
        }
        stop(){
            this.running = false;
        }
    }
    const rotation = new Rotation();

    onMount( async ()=>{
        rotation.start();
        return () => {
            rotation.stop();
        }
    });

    performanceStore.subscribe( async incoming => {
        if( typeof document === 'undefined' ){ return; }
        await syncAnim();
        scene = incoming;
    });

</script>

<div class:active={ state % totalUsers === userPosition }
    style="
        --color: {scene.color};
        --fadeIn: {scene.fadeIn}ms;
        --fadeOut: {scene.fadeOut}ms;
    "
></div>

<style>

    div {
        position: absolute;
        left: 0;
        width: 100%;
        top: 0;
        height: var(--100vh);
        transition: background-color 0ms linear;
        transition-duration: var(--fadeOut);
    }

    div.active {
        background-color: var(--color);
        transition-duration: var(--speedIn);
    }

</style>