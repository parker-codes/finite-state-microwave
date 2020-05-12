<script>
export let src;
export let alt;
export let large = false;
</script>

<div class="flex justify-center items-center">
    <img {src} {alt} class="w-4/5 {large ? 'lg:w-4/5' : 'lg:w-1/2'} text-center" />
</div>