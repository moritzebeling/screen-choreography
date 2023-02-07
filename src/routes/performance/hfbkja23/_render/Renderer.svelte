<script>

    import { performanceStore } from "$lib/stores";
    import { syncAnim } from "$lib/helpers.js";

    export let userPosition = 0;
    export let totalUsers = 1;

    let showColor = false;
    let scene = $performanceStore;

    function flicker(){
        showColor = true;
        if( scene.fadeOut < 1 ){
            return;
        }
        setTimeout(()=>{
            showColor = false;
        }, scene.speed + 100 );
    }

    function updateStyles( styles = {} ){
        Object.keys( styles ).forEach((key) => {
            document.body.style.setProperty( key, styles[key] );
        });
    }

    class Rotation {
        constructor(){
            this.running = false;
            this.current = 0;
            this.speed = 1000;
            this.interval;
            this.onTick = () => {};
            this.onComplete = () => {};
        }
        async start(){
            await syncAnim( 1000 );
            this.running = true;
            this.current = 0;
            setTimeout(this.tick, this.speed );
        }
        tick(){
            if( rotation.current === userPosition ){
                rotation.onTick();
            }
            if( rotation.current === totalUsers - 1 ){
                rotation.onComplete();
            }
            rotation.current = (rotation.current + 1) % totalUsers;
            if( rotation.running ){
                setTimeout(rotation.tick, rotation.speed );
            }
        }
        stop(){
            this.running = false;
            clearInterval( this.interval );
        }
    }
    const rotation = new Rotation();

    performanceStore.subscribe( incoming => {
        if( typeof document === 'undefined' ){
            return;
        }
        console.log( scene.rotate, incoming.rotate );
        scene.background = incoming.background;
        updateStyles({
            '--background': incoming.background
        });
        if( scene.rotate && incoming.rotate ){
            console.log( 'rotation remains on' );
            /*
            rotation remains on
            styles should be updated dependingly, but in sync and after fadeout
            */
            scene.color = incoming.color;
            rotation.onComplete = () => {
                updateStyles({
                    '--color': scene.color
                });
            };
        } else if( scene.rotate && !incoming.rotate ){
            console.log( 'rotation stop after complete' );
            /*
            rotation should be stopped after circle is complete
            styles should be updated afterwards
            */
            scene.rotate = false;
            rotation.onComplete = () => {
                rotation.stop();
            };
        } else if( !scene.rotate && incoming.rotate ){
            console.log( 'rotation start' );
            /*
            rotation should be started in sync
            styles should be updated beforehand
            */
            scene.rotate = true;
            scene.color = incoming.color;
            updateStyles({
                '--color': scene.color
            });
            rotation.start();
            rotation.onTick = () => {
                flicker();
            };
        } else if( !scene.rotate && !incoming.rotate ){
            /*
            rotation is off
            styles should be updated immediately but in sync
            */
            rotation.stop();
            scene.color = incoming.color;
            scene.speed = incoming.speed;
            scene.fadeOut = incoming.fadeOut;
            updateStyles({
                '--color': scene.color,
                '--speed': scene.speed + 'ms',
                '--fadeOut': scene.fadeOut + 'ms',
            });
            if( scene.color !== false ){
                flicker();
            } else {
                showColor = false;
            }
        }
    });

</script>

<p>
    {totalUsers} / 
    {userPosition} / 
    {rotation.current}
</p>

<div class:visible={showColor}></div>

<style>

    div {
        position: absolute;
        left: 0;
        width: 100%;
        top: 0;
        height: var(--100vh);
        background-color: var(--color);
        transition: all var(--fadeOut) linear;
        opacity: 0;
    }

    div.visible {
        opacity: 1;
        transition-duration: var(--speed);
    }

    p {
        margin: 1rem;
        color: white;
        mix-blend-mode: difference;
        position: relative;
        z-index: 10;
    }

</style>