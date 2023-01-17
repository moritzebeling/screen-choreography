<script>

    import { currentScene } from "$lib/control";

    import Intro from './_scenes/intro/+page.svelte';
    import Sorting from './_scenes/sorting/+page.svelte';
    import Pulse from './_scenes/pulse/+page.svelte';
    import Colors from './_scenes/colors/+page.svelte';
    import Circle from './_scenes/circle/+page.svelte';
    import Up from './_scenes/up/+page.svelte';
    import Qr from './_scenes/qr/+page.svelte';
    import Touch from './_scenes/touch/+page.svelte';

    let localScene = false;
    function controlLocalScene( global ){
        localScene = false;
    }
    $: controlLocalScene( $currentScene );
    
</script>

{#if $currentScene === 'intro'}
    <Intro />
{/if}

{#if $currentScene === 'sorting' && localScene === false }
    <Sorting on:continue={() => localScene = 'pulse'} />
{/if}

{#if ($currentScene === 'sorting' && localScene === 'pulse') || $currentScene === 'pulse' || $currentScene === 'synchronize' }
    <Pulse morphing={$currentScene === 'synchronize'} />
{/if}

{#if $currentScene === 'colors'}
    <Colors />
{/if}

{#if $currentScene === 'circle'}
    <Circle />
{/if}

{#if $currentScene === 'up'}
    <Up />
{/if}

{#if $currentScene === 'qr'}
    <Qr />
{/if}

{#if $currentScene === 'touch'}
    <Touch />
{/if}