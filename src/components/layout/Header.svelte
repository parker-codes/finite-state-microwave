<script>
import {isActive, url} from '@sveltech/routify'

const links = [
    { name: 'Machine', path: '/' },
    { name: 'How It Works', path: '/how' },
    { name: 'Tech', path: '/tech' },
];
</script>

<header class="w-screen flex justify-start">
    {#each links as { name, path}}
        <div class:active={$isActive(path)}>
            <a href={path}>
                {name}
            </a>
        </div>
    {/each}
</header>
