<script>
    
    import { page } from "$app/stores";
    import { config } from "$lib/config";
    import Menu from "$lib/Menu.svelte";
    import { instructions } from './text';

    export let data;

    let language = data.user.language;
    let system = data.user.system;

    function getText( language, system ){
        language = instructions.hasOwnProperty(language) ? language : 'en';
        console.log( language, system );
        if( instructions[language].hasOwnProperty(system) ){
            return instructions[language][system];
        }
        return instructions[language]['default'];
    }

    $: instruction = getText( language, system );

</script>

<svelte:head>
    <title>{config.title} (Instructions)</title>
</svelte:head>

<main class="layout">

    <div class="text">
        <div class="buttons">

            <select class="button" bind:value={language}>
                <option value="de">Deutsch</option>
                <option value="en">English</option>
            </select>

            <select class="button" bind:value={system}>
                <option value="ios">iOS</option>
                <option value="mac">Mac</option>
                <option value="default">Other</option>
            </select>

        </div>
        <ol>
            {#each instruction as item}
                <li>{item}</li>
            {/each}
        </ol>
    </div>

    <Menu fixed={true}>
        <a class="button" href="/live/{$page.params.room}">Close</a>
    </Menu>
    
</main>

<style>

    main {
        mix-blend-mode: difference;
    }
    .text {
        padding: 1rem;
        flex: 1;
    }
    ol {
        font-size: 2rem;
        margin: 1rem 0 1rem 3.5rem;
    }
    ol li {
        list-style-type: decimal;
        margin: 1rem 0;
    }
    .buttons {
        display: flex;
        gap: 0.3em;
    }
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        text-align: center;
        text-align-last: center;
    }
    select:focus {
        outline: none;
    }

</style>