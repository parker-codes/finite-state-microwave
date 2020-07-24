<script>
import { isActive, layout, url, prefetch } from '@sveltech/routify';

const links = [
    { name: 'Machine', path: '/' },
    { name: "How It's Made", path: '/how' },
    { name: 'Tech', path: '/tech' },
];

// prefetch all tabs for a day
links.forEach(link => prefetch(link.path, { validFor: 60 * 24 }));
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

<div class="w-full h-screen">
    <header class="flex justify-between max-w-lg px-4 py-4 mx-auto">
        {#each links as { name, path }}
            <div class="ml-6 font-bold md:ml-0 first:ml-0">
                <a href={$url(path)} class="md:px-8 py-4 {$isActive(path) ? 'text-blue-600' : ''}">
                    {name}
                </a>
            </div>
        {/each}
    </header>

    <slot />
</div>
