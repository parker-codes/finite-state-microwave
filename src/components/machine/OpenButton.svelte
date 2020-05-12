<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
</script>

<button
    id="open-button"
    on:click={() => dispatch('press')}
    on:keyPress={() => dispatch('press')}
    class="row-start-6 row-span-1 col-start-5 col-span-1 bg-gray-900 border border-gray-800 rounded-md p-1">
    <div class="h-full w-full border border-gray-700 rounded"></div>
</button>
