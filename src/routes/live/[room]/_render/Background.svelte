<script>
    
    import { sceneStore } from "$lib/stores";
    import { onDestroy } from "svelte";
    import { setGlobalStyleVariables } from "./global";

    function update( scene ){
        setGlobalStyleVariables({
            '--background': scene.background,
            '--speed': `${scene.speed}ms`,
        });
    }
    $: update( $sceneStore );

    onDestroy(()=>{
        setGlobalStyleVariables({
            '--background': `black`,
            '--speed': `2000ms`,
        });
    });

</script>
