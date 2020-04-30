<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
</script>

<button
    on:click={() => dispatch('press')}
    on:keyPress={() => dispatch('press')}
    class="z-10 border-1 rounded-lg m-1 p-1 bg-gray-900 text-white {$$props.class}">
    <slot />
</button>