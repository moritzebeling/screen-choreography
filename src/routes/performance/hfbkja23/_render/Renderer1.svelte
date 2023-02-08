<script>

    import { performanceStore } from "$lib/stores";
    import { syncAnim } from "$lib/helpers.js";

    export let userPosition = 0;
    export let totalUsers = 1;

    let showColor = false;
    let scene = {...$performanceStore};
    let waitForColorToFadeOut = Promise.resolve(true);

    function flicker(){
        showColor = true;
        if( scene.fadeOut < 1 ){
            return;
        }
        return new Promise((resolve) => {
            let duration = Math.max(
                scene.interval - scene.speed,
                scene.speed
            );
            setTimeout(() => {
                showColor = false;
                setTimeout(() => {
                    resolve(true);
                }, scene.fadeOut + 10);
            }, duration );
        });
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
            this.interval;
            this.onTick = () => {};
            this.onComplete = () => {};
        }
        async start(){
            await syncAnim( 1000 );
            this.running = true;
            this.current = 0;
            this.interval = setTimeout(this.tick, scene.interval );
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
                rotation.interval = setTimeout(rotation.tick, scene.interval );
            }
        }
        stop(){
            this.running = false;
            clearInterval( this.interval );
        }
    }
    const rotation = new Rotation();

    async function updateInSync(callback){
        await syncAnim( 1000 );
        callback();
    }

    performanceStore.subscribe( incoming => {
        if( typeof document === 'undefined' ){
            return;
        }

        scene.background = incoming.background;
        updateStyles({
            '--background': incoming.background,
            '--speed': incoming.speed + 'ms',
        });

        if( scene.rotate && incoming.rotate ){
            console.log( 'rotation remains on' );
            /*
            rotation remains on
            styles should be updated dependingly, but in sync and after fadeout
            */
            rotation.onTick = () => {
                waitForColorToFadeOut = flicker();
            };
            rotation.onComplete = () => {
                updateInSync(() => {
                    scene.speed = incoming.speed;
                    scene.fadeOut = incoming.fadeOut;
                });
                waitForColorToFadeOut.then(() => {
                    scene.color = incoming.color;
                });
            };
            updateInSync(() => {
                scene.interval = incoming.interval;
            });
        } else if( scene.rotate && !incoming.rotate ){
            console.log( 'rotation stop after complete' );
            /*
            rotation should be stopped after circle is complete
            styles should be updated afterwards
            */
            scene.rotate = false;
            rotation.onComplete = () => {
                rotation.stop();
                waitForColorToFadeOut.then(() => {
                    scene.interval = incoming.interval;
                    scene.color = incoming.color;
                    scene.speed = incoming.speed;
                    scene.fadeOut = incoming.fadeOut;
                });
            };
        } else if( !scene.rotate && incoming.rotate ){
            console.log( 'rotation start' );
            /*
            rotation should be started in sync
            styles should be updated beforehand
            */
            scene.rotate = true;
            scene.interval = incoming.interval;
            scene.color = incoming.color;
            scene.speed = incoming.speed;
            scene.fadeOut = incoming.fadeOut;
            rotation.start();
            rotation.onTick = () => {
                waitForColorToFadeOut = flicker();
            };
        } else if( !scene.rotate && !incoming.rotate ){
            /*
            rotation is off
            styles should be updated immediately but in sync
            */
            rotation.stop();
            waitForColorToFadeOut.then(() => {
                scene.interval = incoming.interval;
                scene.color = incoming.color;
                scene.speed = incoming.speed;
                scene.fadeOut = incoming.fadeOut;
                if( scene.color !== false ){
                    waitForColorToFadeOut = flicker();
                } else {
                    showColor = false;
                }
            });
        }
    });

</script>

<p>
    {userPosition}
</p>

<div style="
    --color:{scene.color};
    --fadeOut:{scene.fadeOut}ms;
" class:visible={showColor}></div>

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