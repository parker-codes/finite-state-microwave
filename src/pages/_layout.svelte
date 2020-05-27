<script>
import { isActive, layout, url } from '@sveltech/routify';

const links = [
    { name: 'Machine', path: '/' },
    { name: "How It's Made", path: '/how' },
    { name: 'Tech', path: '/tech' },
];
</script>

<svelte:head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-136316141-2"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-136316141-2');
    </script>

    <link href="https://fonts.googleapis.com/css2?family=Overpass:wght@200;400;700&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'Overpass', sans-serif; }
        body { @apply bg-gray-200; }
    </style>
</svelte:head>

<div class="w-screen h-screen">
    <header class="max-w-lg mx-auto flex justify-between px-4 py-4">
        {#each links as { name, path }}
            <div class="ml-6 md:ml-0 first:ml-0 font-bold">
                <a href={$url(path)} class="md:px-8 py-4 {$isActive(path) ? 'text-blue-600' : ''}">
                    {name}
                </a>
            </div>
        {/each}
    </header>

    <slot />
</div>
