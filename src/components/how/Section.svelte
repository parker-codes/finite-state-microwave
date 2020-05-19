<script>
export let darkBg = false;

$: themeClasses = darkBg ? 'bg-gray-900' : '';
</script>

<div class="py-8 px-4 flex justify-center items-center {themeClasses}">
    <div class="w-11/12 max-w-2xl">
        <slot />
    </div>
</div>