<script>

    import { seconds } from "$lib/system";

    let r = 0;
    let g = 0;
    let b = 255;

    const colors = [
        [255,0,255],
        [255,0,0],
        [0,255,0],
        [0,0,0],
    ];

    let i = 0;
    let c = 0;

    function switchTarget( s ){
        i++;
        if( i % 5 === 0 ){
            r = colors[c][0];
            g = colors[c][1];
            b = colors[c][2];
            c++;
        }
    }

    $: switchTarget( $seconds );

</script>

<main style="background-color:rgb({r},{g},{b});"></main>

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