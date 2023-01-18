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
    }
    div {
        height: 100%;
    }

</style>