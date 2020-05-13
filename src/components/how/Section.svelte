<script>
export let darkBg = false;

$: themeClasses = darkBg ? 'bg-gray-900' : '';
</script>

<div class="py-8 px-4 flex justify-center items-center {themeClasses}">
    <div class="w-11/12 md:w-5/6">
        <slot />
    </div>
</div>