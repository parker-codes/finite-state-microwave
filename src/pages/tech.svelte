<script>
const items = [
    { name: 'Svelte', for: 'Frontend Framework', logo: 'svelte', link: 'https://svelte.dev/' },
    { name: 'XState', for: 'Machine Definition', logo: 'xstate', link: 'https://xstate.js.org/' },
    { name: 'Routify', for: 'Routing/Pages', logo: 'routify', link: 'https://routify.dev/' },
    { name: 'TailwindCSS', for: 'Styling', logo: 'tailwindcss', link: 'https://tailwindcss.com/' },
    { name: 'Render', for: 'Hosting', logo: 'render', link: 'https://render.com/' },
    { name: 'Hero Patterns', for: 'Background Patterns', logo: 'hero-patterns', link: 'https://www.heropatterns.com/' },
];

const trackingParams = '?utm_source=blog_post&utm_medium=web&utm_campaign=finite-state-machine';
</script>

<div class="flex flex-col items-center justify-center max-w-md px-4 pb-16 mx-auto mt-16">
    {#each items as item}
        <a href="{item.link}{trackingParams}" class="flex flex-col items-center w-full p-8 mt-4 text-center transition duration-200 ease-in-out border-2 border-transparent rounded cursor-pointer hover:border-blue-600 first:mt-0 hover:bg-gray-300">
            <div class="h-16 mx-auto">
                <img
                    src="/img/logos/{item.logo}.svg"
                    alt="{item.name} icon"
                    class="w-full h-full"
                    width="120"
                    height="64"
                />
            </div>

            <div class="mt-4 text-xl font-bold">
                {item.name}
            </div>

            <div class="mt-2 italic">{item.for}</div>
        </a>
    {/each}
</div>