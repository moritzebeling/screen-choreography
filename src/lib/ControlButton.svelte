<script>
    
    import { signals, sendSignal, usedSignals } from "$lib/control";

    export let id = 1;
    export let signal = signals[id];

</script>

<button
    on:click={()=> sendSignal(signal[0])}
    class:active={$usedSignals[0] === signal[0]}
    class:last={$usedSignals.includes(signal[0])}
    title={signal[1]}
    >
    <slot>{signal[1]}</slot>
</button>

<style>

    button {
        cursor: pointer;
        display: block;
        padding: 0.5em 1em;
        border-radius: 2em;
        background-color: white;
        color: black;
        transition: background-color 200ms ease;
    }
    button.last {
        background-color: #999;
    }
    button:hover,
    button.active {
        background-color: #00f;
        color: black;
    }

</style>