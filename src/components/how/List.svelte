<script>
export let items = [];
export let numbered = false;
export let onDarkBg = false;

$: themeClasses = onDarkBg ? 'text-white' : '';
</script>

<ul class="text-lg list-inside my-4 {themeClasses} {numbered ? 'list-decimal' : 'list-disc'}">
    {#each items as item}
    <li>{item}</li>
    {/each}
</ul>