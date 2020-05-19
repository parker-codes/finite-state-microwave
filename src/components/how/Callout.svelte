<script>
export let title = '';
export let onDarkBg = false;

$: themeClasses = onDarkBg ? 'text-white' : '';
</script>

<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-4 my-8 text-lg {themeClasses}" role="alert">
    {#if !!title}
        <p class="text-xl font-bold mb-4">{title}</p>
    {/if}

    <p><slot /></p>
</div>