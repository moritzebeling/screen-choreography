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

    function switchColor(){

        s++;
        if( s * 1000 < speed ){
            return;
        }
        s = 0;

        if( i < 1 ){
            color = blue;
        } else if( i > 3 ) {
            color = black;
        } else {
            color = [red,blue,green][ (i + 100 - $user.num) % 3 ];
        }

        i++;
    }

    $: switchColor( $seconds );

</script>

<div in:fade={{duration:800}}>
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