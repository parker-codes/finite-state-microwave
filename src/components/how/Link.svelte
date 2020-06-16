<script>
export let to;
export let newTab = false;
</script>

<a href={to} class="underline text-blue-700 hover:text-blue-600" target={ newTab ? '_blank' : null }>
    <slot />
</a>