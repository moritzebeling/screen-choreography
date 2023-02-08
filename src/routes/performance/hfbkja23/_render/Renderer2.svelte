<script>

    import { performanceStore } from "$lib/stores";
    import { onMount } from "svelte";

    export let userPosition = 0;
    export let totalUsers = 1;

    let scene = {...$performanceStore};
    let active = false;
    let info = 0;

    function updateStyles( styles = {} ){
        Object.keys( styles ).forEach((key) => {
            document.body.style.setProperty( key, styles[key] );
        });
    }

    class Rotation {
        constructor(){
            this.running = false;
            this.zeroOffset = 0;
            this.state = 0;
            this.stopSoon = false;
            this.speed = 1000;
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
        async start( speed ){
            this.speed = speed;
            this.stopSoon = false;
            this.running = true;
            
            let timestamp = this.timeId( this.speed );
            this.state = timestamp % totalUsers;
            this.zeroOffset = totalUsers - this.state;

            this.log('start');

            this.tick();
        }
        async tick(){

            let timestamp = await this.sync( this.speed );
            this.state = (timestamp + this.zeroOffset) % totalUsers;

            this.evaluate();

            if( scene.interval !== this.speed ){
                this.speed = scene.interval;
                let newTimestamp = this.timeId( scene.interval );
                let newOffset = totalUsers - ( newTimestamp % totalUsers );
                this.zeroOffset = newOffset + this.state;
            }

            if( this.running ){
                this.tick();
            }
        }
        evaluate(){
            info = this.state;
            active = this.state === userPosition;
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
                updateStyles({
                    '--speed': $performanceStore.speed + 'ms',
                    '--background': $performanceStore.background,
                });
            }
        }
        stop(){
            this.stopSoon = true;
        }
        onStop(){
            this.running = false;
            active = false;
            scene = $performanceStore;
            updateStyles({
                '--speed': $performanceStore.speed + 'ms',
                '--background': $performanceStore.background,
            });
        }
        log( name = 'tick', args ){
            if( userPosition > 0 ){ return; }
            console.log( name, {
                state: this.state,
                zeroOffset: this.zeroOffset,
                speed: this.speed,
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
        if( scene.rotate && incoming.rotate ){
            scene.interval = incoming.interval;
        } else if( !scene.rotate && incoming.rotate ){
            scene = incoming;
            updateStyles({
                '--speed': incoming.speed + 'ms',
                '--background': incoming.background,
            });
            rotation.start( scene.interval );
        } else if( scene.rotate && !incoming.rotate ){
            rotation.stop();
        } else if( !scene.rotate && !incoming.rotate ){
            scene = incoming;
            updateStyles({
                '--speed': incoming.speed + 'ms',
                '--background': incoming.background,
            });
        }
    });

</script>

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
        transition-duration: var(--fadeIn);
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