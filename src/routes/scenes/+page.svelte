<script>

    import { currentScene } from "$lib/control";

    import Intro from './intro/+page.svelte';
    import Sorting from './sorting/+page.svelte';
    import Pulse from './pulse/+page.svelte';
    import Colors from './colors/+page.svelte';
    import Circle from './circle/+page.svelte';
    import Up from './up/+page.svelte';
    import Qr from './qr/+page.svelte';
    import Touch from './touch/+page.svelte';

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

{#if ($currentScene === 'sorting' || localScene === 'pulse') || $currentScene === 'pulse' || $currentScene === 'synchronize' }
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