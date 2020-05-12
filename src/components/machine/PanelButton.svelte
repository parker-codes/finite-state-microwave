<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let bold = false;
</script>

<button
    on:click={() => dispatch('press')}
    on:keyPress={() => dispatch('press')}
    class="z-10 border-1 rounded m-1 p-1 bg-gray-900 text-white select-none focus:outline-none focus:shadow-outline {$$props.class}"
    class:font-bold={bold}
    class:text-lg={bold}
    >
    <slot />
</button>