<script>
    
    import { sceneStore } from "$lib/stores";
    import { onDestroy } from "svelte";
    import { setGlobalStyleVariables } from "./global";

    function update( scene ){
        let bg = scene.background;
        setGlobalStyleVariables({
            '--background': `rgb(${bg.r}, ${bg.g}, ${bg.b})`,
            '--speed': `${scene.speed}ms`,
        });
    }
    $: update( $sceneStore );

    onDestroy(()=>{
        setGlobalStyleVariables({
            '--background': `#000000`,
            '--speed': `2000ms`,
        });
    });

</script>
