<script>
export let src;
export let alt;
export let large = false;
</script>

<div class="flex justify-center items-center my-8">
    <img {src} {alt} class="w-full {large ? 'lg:w-4/5' : 'lg:w-1/2'} text-center" />
</div>