<script>

    import { fade } from 'svelte/transition';
    import { seconds } from "$lib/clock";
    import { user, users } from "$lib/realtime";
    import { morph } from '$lib/helpers';

    let red = [255,0,0];
    let green = [0,255,0];
    let blue = [0,0,255];
    let black = [0,0,0];
    let white = [255,255,255];

    let color = blue;

    let s = 0;
    let i = 0;
    let speed = 5000;
    let inAutopilot = false;
    let speedUp = 0;

    function autoPilot(){

        let p = (i - $user.num) % $users.ordered;

        color = p === 0 ? white : black;

        console.log( i, speed, color );

        if( speedUp >= 0 ){
            speed = morph( speed, 150, 50, 0.05 );
            if( speed <= 150 ){
                speedUp++;
            }
            if( speedUp > 80 ){
                speedUp = -1;
            }
        } else {
            speed = morph( speed, 5000, 50 );
        }

        i++;
        setTimeout(() => {
            autoPilot();
        }, speed);
    }

    function switchColor(){

        if( speed < 2000 || inAutopilot ){
            if( !inAutopilot ){
                inAutopilot = true;
                autoPilot();
            }
            return;
        }

        s++;
        if( s * 1000 < speed ){
            return;
        }
        s = 0;

        speed = morph( speed, 0, 50, 0.075 );

        if( i < 1 ){
            color = blue;
        // } else if( speed > 2500 ) {
        } else {
            color = [red,blue,green][ (3-$user.num+i) % 3 ];
        // } else {
        //     color = [white,black][ ($user.num+i) % 2 ];
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