<script>
const items = [
    { name: 'Svelte', for: 'Frontend Framework', icon: 'svelte', link: 'https://svelte.dev/' },
    { name: 'XState', for: 'Machine Definition', icon: 'xstate', link: 'https://xstate.js.org/' },
    { name: 'Routify', for: 'Routing/Pages', icon: 'routify', link: 'https://routify.dev/' },
    { name: 'TailwindCSS', for: 'Styling', icon: 'tailwind', link: 'https://tailwindcss.com/' },
    { name: 'Render', for: 'Hosting', icon: 'render', link: 'https://render.com/' },
    { name: 'Hero Patterns', for: 'Background Patterns', icon: 'hero-patterns', link: 'https://www.heropatterns.com/' },
];

const trackingParams = '?utm_source=blog_post&utm_medium=web&utm_campaign=finite-state-machine';
</script>

<div class="max-w-xl mx-auto mt-16 pb-16">
    {#each items as item}
        <div class="flex items-center mt-4 first:mt-0">
            <div class="w-16 h-16">
                <img
                    src="/img/icons/{item.icon}"
                    alt="{item.icon} icon"
                    class="w-full h-full"
                    width="64"
                    height="64"
                />
            </div>

            <div class="ml-24 w-40">
                <a href="{item.link}{trackingParams}">
                    {item.name}
                </a>
            </div>

            <div class="ml-12">{item.for}</div>
        </div>
    {/each}
</div>