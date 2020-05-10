<script>
import { writable } from 'svelte/store';
import { isActive, layout, url } from '@sveltech/routify';
import { TabsTransition } from '@sveltech/routify/decorators';
const width = writable();

const links = [
    { name: 'Machine', path: '/' },
    { name: 'How It Works', path: '/how' },
    { name: 'Tech', path: '/tech' },
];
</script>

<div class="bg-gray-200 w-screen h-screen" bind:offsetWidth={$width}>
    <header class="max-w-lg mx-auto flex justify-between px-4 py-4">
        {#each links as { name, path }}
            <div class="ml-6 first:ml-0 font-bold">
                <a href={$url(path)} class="{$isActive(path) ? 'text-indigo-500' : ''}">
                    {name}
                </a>
            </div>
        {/each}
    </header>

    <slot decorator={TabsTransition} scoped={{ width }} />
</div>
