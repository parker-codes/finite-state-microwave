<script>
export let title = '';
export let onDarkBg = false;

$: themeClasses = onDarkBg ? 'text-white' : '';
</script>

<div class="bg-indigo-100 rounded border-2 border-l-8 border-indigo-500 text-indigo-700 p-4 md:mx-4 my-8 text-lg {themeClasses}" role="alert">
    {#if !!title}
        <p class="text-xl font-bold mb-4">{title}</p>
    {/if}

    <p><slot /></p>
</div>