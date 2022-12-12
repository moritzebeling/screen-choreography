<script>

    let last = [];
    let active = false;

    function sendSignal( id ){
        active = id;
        if( !last.includes(id) ){
            last = [...last,id];
        }
        console.log( last );
    }

    const signals = [
        ['1-synchronize','1 Synchronize'],
        ['2-colors','2 Colors'],
        ['3-left-to-right','3 Left to Right'],
        ['4-circle','4 Circle'],
        ['5-bottom-to-top','5 Bottom to Top'],
        ['6-qr','6 QR'],
        ['7-touch-display','7 Touch'],
    ];

</script>

<nav>
    {#each signals as [id,text]}
        <button
            on:click={()=> sendSignal(id)}
            class:active={id===active}
            class:last={last.includes(id)}
            >{text}</button>
    {/each}
</nav>

<style>

    nav {
        padding: 1rem;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    button {
        cursor: pointer;
        display: block;
        padding: 0.5em 1em;
        border-radius: 2em;
        background-color: white;
        color: black;
        transition: background-color 200ms ease;
        margin: 0.3rem;
        font-size: 2rem;
    }
    button.last {
        background-color: #aaa;
    }
    button:hover,
    button.active {
        background-color: #00f;
        color: black;
    }

</style>