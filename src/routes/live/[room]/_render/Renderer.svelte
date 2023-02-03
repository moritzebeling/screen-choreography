<script>

    import { sceneStore } from "$lib/stores";
    import Background from "./Background.svelte";

    /*
    renderers
    - background color
    - primary color
    - animation
    - text
    - image
    */

</script>

<Background color={$sceneStore.background} />