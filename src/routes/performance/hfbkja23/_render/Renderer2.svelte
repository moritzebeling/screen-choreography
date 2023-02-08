<script>

    import { performanceStore } from "$lib/stores";
    import { onMount } from "svelte";

    export let userPosition = 0;
    export let totalUsers = 1;

    let scene = {...$performanceStore};
    let active = false;
    let info = '';

    class Rotation {
        constructor(){
            this.running = false;
            this.zeroOffset = 0;
            this.state = 0;
            this.stopSoon = false;
        }
        onStop(){
            this.running = false;
            active = false;
            scene = $performanceStore;
        }
        completed(){
            if( this.stopSoon ){
                this.onStop();
            } else {
                scene.color = $performanceStore.color;
                scene.fadeIn = $performanceStore.fadeIn;
                scene.fadeOut = $performanceStore.fadeOut;
            }
        }
        evaluate(){
            active = this.state === userPosition;
            info = this.state;
            if( this.state === 0 ){
                this.completed();
            }
        }
        sync( precision = 1000, returnOffset = false ) {
            let now = Date.now();
            let startAt = Math.ceil( now / precision ) * precision;
            if( returnOffset ){
                return Math.floor( startAt / precision ) % totalUsers;
            }
            let id = (Math.floor( startAt / precision ) - this.zeroOffset) % totalUsers;
            let timeout = startAt - now;
            return new Promise((resolve) => {
                setTimeout(() => resolve( id ), timeout);
            });
        }
        async tick( _state ){

            this.state = _state || await this.sync( scene.interval );
            this.evaluate();
            
            if( this.running ){
                this.tick();
            }
        }
        async start(){
            this.stopSoon = false;
            this.running = true;
            this.state = this.sync( scene.interval, true );
            this.zeroOffset = this.state;
            this.tick();
        }
        stop(){
            this.stopSoon = true;
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
        if( scene.rotate && incoming.rotate ){
            scene.interval = incoming.interval;
        } else if( !scene.rotate && incoming.rotate ){
            scene = incoming;
            rotation.start();
        } else if( scene.rotate && !incoming.rotate ){
            rotation.stop();
        } else if( !scene.rotate && !incoming.rotate ){
            scene = incoming;
        }
    });

</script>

<p>{info}</p>

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