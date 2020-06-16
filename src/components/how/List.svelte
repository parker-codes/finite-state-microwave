<script>
export let items = [];
export let title = null;
export let numbered = false;
export let onDarkBg = false;

$: themeClasses = onDarkBg ? 'text-white' : '';
</script>

{#if !!title}
<div class="text-lg font-bold mt-8 {themeClasses}">{title}</div>
{/if}
<ul class="text-lg list-inside mb-8 {themeClasses} {numbered ? 'list-decimal' : 'list-disc'}">
    {#each items as item}
    <li>{item}</li>
    {/each}
</ul>