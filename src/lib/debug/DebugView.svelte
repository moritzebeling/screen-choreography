<script>

    import Menu from "$lib/Menu.svelte";
    import Fingerprint from './Fingerprint.svelte';

    import { duration, seconds, time } from "$lib/clock";
    import { config } from '$lib/config';

    export let closeHref = '/';
 
    $: date = {
        time: $time,
        seconds: $seconds,
        timeOnSite: $duration,
    };

</script>

<main class="layout">

    <Fingerprint />

    <div class="text">
        <pre>Date {JSON.stringify(date, null, 4)}</pre>
        <slot />
    </div>
        
</main>
    
<Menu fixed={true}>
    <a class="button" href="{closeHref}">Close</a>
    <a class="button" href="{config.issues}" target="_blank" rel="noopener nofollow noreferrer">Report bug or suggest feature</a>
</Menu>

<style>

    main {
        mix-blend-mode: difference;
    }
    .text {
        flex: 1;
    }
    .text :global(pre) {
        margin: 1rem;
    }

</style>