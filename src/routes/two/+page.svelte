<script>

    import seedrandom from "seedrandom";
  
    import { seconds } from "$lib/system";

    let large = false;
    let position = 'top';

    function control(){
        let rndm = seedrandom( $seconds / 2 )
        large = rndm() > 0.5;
        if( large ){
            position = ['top','bottom','left','right'][Math.floor(rndm()*4)];
        }
    }
    $: control( $seconds );

</script>

<main class:large class="{position}"></main>

<style>

    main {
        position: fixed;
        background-color: white;
        transition: all 500ms ease-in-out;
        transition-property: width, height;
        width: 0;
        height: 0;
    }
    .top {
        top: 0;
        width: 100%;
    }
    .bottom {
        bottom: 0;
        width: 100%;
    }
    .left {
        left: 0;
        height: 100%;
    }
    .right {
        right: 0;
        height: 100%;
    }
    .top.large,
    .bottom.large {
        height: 100%;
    }
    .left.large,
    .right.large {
        width: 100%;
    }

</style>