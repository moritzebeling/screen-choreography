<script>

    import { fade } from 'svelte/transition';
    import { seconds } from "$lib/clock";

    let r = 0;
    let g = 0;
    let b = 255;

    const colors = [
        [0,0,255],
        [255,0,255],
        [255,0,0],
        [0,255,0],
        [0,0,0],
    ];

    let i = 0;
    let c = 0;

    function switchTarget( s ){
        i++;
        if( i % 5 === 2 ){
            r = colors[c][0];
            g = colors[c][1];
            b = colors[c][2];
            if( c < colors.length - 1 ){
                c++;
            }
        }
    }

    $: switchTarget( $seconds );

</script>

<div in:fade>
    <main style="background-color:rgb({r},{g},{b});"></main>
</div>

<style>

    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: background-color 5s ease-in-out;
    }

</style>