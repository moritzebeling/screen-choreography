<script>

    export let position = 'top';

</script>

<aside class="{position}">
    <slot />
</aside>

<style>

    aside {
        padding: 1rem;
        position: fixed;
        left: 0;
        z-index: 10;
    }
    aside.top {
        top: 0;
    }
    aside.bottom {
        bottom: 0;
    }

</style>