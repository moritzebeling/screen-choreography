<script>

    import { fade } from 'svelte/transition';
    import { seconds } from "$lib/clock";
    import { user } from "$lib/realtime";

    let red = [255,0,0];
    let green = [0,255,0];
    let blue = [0,0,255];
    let black = [0,0,0];
    let white = [255,255,255];

    let color = blue;

    function morph( value, target, factor = 0.9 ){
        const diff = target - value;
        if( Math.abs(diff) < 50 ){
            return target;
        }
        if( value < target ){
            value = Math.min( value * 1.1, target );
        } else {
            value = Math.max( value * 0.9, target );
        }
        return Math.floor( value );
    }

    let s = 0;
    let i = 0;
    let speed = 5000;
    let inAutopilot = false;
    let speedUp = 0;

    function autoPilot(){
        inAutopilot = true;

        color = [white,black,black,black][ ($user.num+i) % 4 ];

        console.log( i, speed, color );

        if( speedUp >= 0 ){
            speed = morph( speed, 100, 0.98 );
            if( speed < 150 ){
                speedUp++;
            }
            if( speedUp > 200 ){
                speedUp = -1;
            }
        } else {
            speed = morph( speed, 5000 );
        }
        i++;
        setTimeout(() => {
            autoPilot();
        }, speed);
    }

    function switchColor(){

        if( speed < 2000 || inAutopilot ){
            if( !inAutopilot ){
                autoPilot();
            }
            return;
        }

        s++;
        if( s * 1000 < speed ){
            return;
        }
        s = 0;

        speed = morph( speed, 0, 0.95 );

        if( i < 1 ){
            color = blue;
        } else if( speed > 3500 ){
            color = [red,green,blue][ ($user.num+i) % 3 ];
        } else {
            color = [white,black][ ($user.num+i) % 2 ];
        }

        console.log( i, speed, color );
        i++;
    }

    $: switchColor( $seconds );

</script>

<div in:fade>
    <main style="--speed:{speed}ms;background-color:rgb({color[0]},{color[1]},{color[2]});"></main>
</div>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: background-color var(--speed) ease-in-out;
    }

</style>