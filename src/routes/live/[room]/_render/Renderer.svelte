<script>

    import { sceneStore } from "$lib/stores";
    import { onDestroy } from "svelte";
    import { setGlobalStyleVariables } from "$lib/helpers.js";

    /*
    renderers
    - background color
    - primary color
    - animation
    - text
    - image
    */

    sceneStore.subscribe( scene => {
        setGlobalStyleVariables({
            '--background': scene.background,
            '--color': scene.color,
            '--speed': `${scene.speed}ms`,
        });
    });
    
    onDestroy(()=>{
        setGlobalStyleVariables({
            '--background': `black`,
            '--color': 'white',
            '--speed': `2000ms`,
        });
    });

</script>
