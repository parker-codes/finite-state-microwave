<script>
import { isActive, layout, url } from '@sveltech/routify';

const links = [
    { name: 'Machine', path: '/' },
    { name: "How It's Made", path: '/how' },
    { name: 'Tech', path: '/tech' },
];
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Overpass:wght@200;400;700&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'Overpass', sans-serif; }
        body { @apply bg-gray-200; }
    </style>
</svelte:head>

<div class="w-screen h-screen">
    <header class="max-w-lg mx-auto flex justify-between px-4 py-4">
        {#each links as { name, path }}
            <div class="ml-6 first:ml-0 font-bold">
                <a href={$url(path)} class="{$isActive(path) ? 'text-blue-600' : ''}">
                    {name}
                </a>
            </div>
        {/each}
    </header>

    <slot />
</div>
