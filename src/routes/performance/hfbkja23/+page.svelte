<script>

    /*
    scene options
    - background color
        - all the same or offset by user num
    - stay on or fade out
        - fade out speed
    - rotate or synchronize
        - rotation speed
    */

    import { socket } from "./socket.js";
    import { onMount } from "svelte";

    let scene;

    onMount(()=>{
        socket.on('scene:updated',data => {
            scene = data;
            console.log('scene:updated',data);
        });
    });

</script>