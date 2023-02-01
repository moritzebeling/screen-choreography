<script>

    import { config } from '$lib/config.js';

</script>

<svelte:head>

    <title>{config.title}</title>
    <meta name="description" content="{config.description}" />
    <meta name="keywords" content="{config.keywords.join(',')}" />
    <meta name="author" content="{config.author}">

    <meta property="og:type" content="website" />
    <meta property="og:title" content="{config.title}" />
    <meta property="og:site_name" content="{config.title}" />
    <meta property="og:url" content="{config.website}" />
    <meta property="og:description" content="{config.description}" />

    <meta property="og:image" content="/preview.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="800" />
    <meta property="og:image:alt" content="screens.moritzebeling.com" />

    <link rel="apple-touch-icon" href="/favicon/favicon-180.png" type="image/png">
    <link rel="alternate icon" href="/favicon/favicon-32.png" type="image/png">
    <link rel="shortcut icon" href="/favicon/favicon.svg" type="image/svg+xml">

</svelte:head>