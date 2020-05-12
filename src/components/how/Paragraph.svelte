<script>
export let onDarkBg = false;

$: themeClasses = onDarkBg ? 'text-white' : '';
</script>

<p class="text-lg my-4 {themeClasses}">
    <slot />
</p>