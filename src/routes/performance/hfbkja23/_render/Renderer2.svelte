<script>

    import { performanceStore } from "$lib/stores";
    import { syncAnim } from "$lib/helpers.js";
    import { onMount } from "svelte";

    export let userPosition = 0;
    export let totalUsers = 1;

    let scene = {...$performanceStore};
    let state = 0;
    let active = false;

    class Rotation {
        constructor(){
            this.running = false;
        }
        evaluate(){
            active = state === userPosition;
        }
        sync( precision = 1000 ) {
            let now = Date.now();
            let startAt = Math.ceil( now / precision ) * precision;
            let timeout = startAt - now;
            let id = Math.floor( startAt / precision ) % totalUsers;
            return new Promise((resolve) => {
                setTimeout(() => resolve( id ), timeout);
            });
        }
        async tick (){

            state = await this.sync( scene.interval );
            this.evaluate();

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
        return () => {
            rotation.stop();
        }
    });

    performanceStore.subscribe( async incoming => {
        if( typeof document === 'undefined' ){ return; }
        if( !scene.rotate && incoming.rotate ){
            scene = incoming;
            rotation.start();
        } else if( scene.rotate && !incoming.rotate ){
            rotation.stop();
        }
        scene = incoming;
    });

</script>

<p>{state}</p>

<div class:active style="
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

    p {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        padding: 1rem;
        color: white;
        mix-blend-mode: difference;
    }

</style>