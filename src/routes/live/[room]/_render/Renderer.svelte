<script>

    import { sceneStore } from "$lib/stores";
    import { onDestroy } from "svelte";
    import { setGlobalStyleVariables } from "$lib/helpers.js";
    import Background from "./Background.svelte";

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

<Background color={$sceneStore.background} />
