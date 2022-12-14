<script>
  
    import { duration, seconds, time } from "$lib/clock";
    import { currentScene } from "$lib/control";
    import { user, users } from "$lib/realtime";
    import Text from "$lib/Text.svelte";
    import { onMount } from "svelte";

    let show = false;

    onMount(()=>{
        console.info('Press CTRL+D to toggle debug info');
    });

    function handle( event ){
        if( event.code === 'KeyD' && event.ctrlKey ){
            show = !show;
        }
    }
    
</script>

<svelte:window on:keydown={handle} />

{#if show}
    <Text position="bottom">
<pre>Date: {$time}
Seconds: {$seconds}
Time on site: {$duration}

User: {$user.id}
Order: {$user.num}

Total: {$users.total}
Ordered: {$users.ordered}
Mobile: {$users.mobile}
Pressed: {$users.pressed}

Scene: {$currentScene}</pre>
    </Text>
{/if}

<style>

    pre {
        margin-top: 1em;
    }

</style>