<script>
    
    import { page } from "$app/stores";
    import Menu from "$lib/Menu.svelte";
    import { userStore } from "$lib/stores";

    const instructions = {
        de: {
            ios: [
                "Energiesparmodus deaktivieren",
                "Sytemeinstellungen > Anzeige & Helligkeit",
                "Helligkeit auf die maximale Stufe stellen",
                "Automatische Sperre auf »nie«",
            ],
            mac: [
                "Display-Helligkeit auf maximale Stufe stellen",
                "Systemeinstellungen > Energie sparen",
                "Monitor ausschalten auf »nie«"
            ],
            default: [
                "Display-Helligkeit auf maximale Stufe stellen",
                "Monitor ausschalten auf »nie«, sodass der Bildschirm aktiviert bleibt"
            ]
        },
        en: {
            ios: [
                "Disable Low Power mode",
                "Go to Settings > Display & Brightness",
                "Set screen brightness to maximum",
                "Set Auto-Lock to »never«"
            ],
            mac: [
                "Set screen brightness to maximum",
                "Go to System Preferences > Energy Saver",
                "Set Display Sleep to »never«"
            ],
            default: [
                "Set screen brightness to maximum",
                "Set Display Sleep to »never«, so the display stays on"
            ]
        }
    };

</script>

<main class="layout">

    <div class="text">
        <p>{$userStore.system} {$userStore.lang}</p>
        <ol>
            {#each instructions[$userStore.lang || 'en'][$userStore.system || 'default'] as item}
                <li>{item}</li>
            {/each}
        </ol>
    </div>

    <Menu>
        <a class="button" href="/live/{$page.params.room}">Close</a>
    </Menu>
    
</main>

<style>

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

</style>