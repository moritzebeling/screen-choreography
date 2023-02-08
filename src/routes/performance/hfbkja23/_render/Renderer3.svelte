<script>

    import { performanceStore } from "$lib/stores";
    import { onMount } from "svelte";

    export let userPosition = 0;
    export let totalUsers = 1;

    let scene = {...$performanceStore};
    let active = false;
    let info = 0;

    class Rotation {
        constructor(){
            this.running = false;
            this.zeroOffset = 0;
            this.state = 0;
            this.i = 0;
            this.interval;
            this.lastState = false;
            this.stopSoon = false;
            this.speed = scene.interval;
        }
        timeId( precision = 1000 ){
            let now = Date.now();
            return Math.ceil( now / precision );
        }
        sync( precision = 1000 ){
            let now = Date.now();
            let id = Math.ceil( now / precision );
            let timeout = (id * precision) - now;
            return new Promise((resolve) => {
                setTimeout(() => resolve( id ), timeout);
            });
        }
        async start(){
            this.stopSoon = false;
            this.running = true;
            
            await this.sync( this.speed * 2 );
            this.interval = setInterval(()=>{
                this.state = this.timeId( this.speed ) % totalUsers;
                if( this.state !== this.lastState ){
                    this.i++;
                    this.lastState = this.state;
                }
                active = this.state === userPosition;
                info = this.i % totalUsers;
            }, 50);
        }
        async updateSpeed( speed ){
            await this.sync( this.speed );
            this.speed = speed;
        }
        evaluate(){
            if( this.state === 0 ){
                this.completed();
            }
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
        stop(){
            this.stopSoon = true;
        }
        onStop(){
            this.running = false;
            active = false;
            scene = $performanceStore;
        }
        log( name = 'tick', args ){
            if( userPosition > 0 ){ return; }
            console.log( name, {
                state: this.state,
                i: this.i,
                ...args
            });
        }
        error( ...args ){
            if( userPosition > 0 ){ return; }
            console.error( ...args );
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
        rotation.updateSpeed( incoming.interval );
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