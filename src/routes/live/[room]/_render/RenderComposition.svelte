<script>

    export let composition;

    function render( element ){
        element.animate( composition.keyframes, composition.timing );
    }

</script>

<div class="container">
    <div style="{composition.styleAttr()}" use:render></div>
</div>

<style>

    .container {
        overflow: hidden;
        position: fixed;
        top: -50vh;
        height: 200vh;
        width: 200vw;
        left: -50vw;
    }
    div {
        height: 100%;
    }

</style>