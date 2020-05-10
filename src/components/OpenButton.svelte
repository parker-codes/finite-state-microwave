<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
</script>

<button
    id="open-button"
    on:click={() => dispatch('press')}
    on:keyPress={() => dispatch('press')}
    class="row-start-6 row-span-1 col-start-5 col-span-1 bg-orange-200">
</button>
