<script>

    export let value;

    const colors = [
        'black',
        'white',
        '#f00',
        '#0f0',
        '#00f',
        '#ff0',
        '#0ff',
        '#f0f',
        'rainbow',
    ];

</script>

<div class="grid">
    {#each colors as color}
        <button
            class="col-1 color"
            class:rainbow={color === 'rainbow'}
            class:active={color === value}
            style="--color:{color === 'black' ? '#222' : color};"
            on:click={()=> value = color}
            >
        </button>
    {/each}
</div>

<style>

    .grid {
        grid-template-columns: repeat(9, 1fr);
        gap: 1rem;
        margin: 4rem 0;
    }
    button {
        padding-top: 100%;
        background: var(--color);
        transition: transform 100ms linear;
        border-radius: 4rem;
        transform: scale(0.3);
    }
    button.rainbow {
        background-image: conic-gradient( #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00 );
    }
    button.active {
        transform: scale(1);
    }

</style>