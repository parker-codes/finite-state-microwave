<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

import PanelButton from './PanelButton.svelte';
</script>

<div id="panel" class="row-start-2 row-span-4 col-start-6 col-span-1 bg-green-200 grid grid-cols-3 grid-rows-7">
    <PanelButton
        on:press={() => dispatch('digit', 1)}
        class="row-start-1 row-span-1 col-start-1 col-span-1">
        1
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('digit', 2)}
        class="row-start-1 row-span-1 col-start-2 col-span-1">
        2
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('digit', 3)}
        class="row-start-1 row-span-1 col-start-3 col-span-1">
        3
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('digit', 4)}
        class="row-start-2 row-span-1 col-start-1 col-span-1">
        4
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('digit', 5)}
        class="row-start-2 row-span-1 col-start-2 col-span-1">
        5
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('digit', 6)}
        class="row-start-2 row-span-1 col-start-3 col-span-1">
        6
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('digit', 7)}
        class="row-start-3 row-span-1 col-start-1 col-span-1">
        7
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('digit', 8)}
        class="row-start-3 row-span-1 col-start-2 col-span-1">
        8
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('digit', 9)}
        class="row-start-3 row-span-1 col-start-3 col-span-1">
        9
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('digit', 0)}
        class="row-start-4 row-span-1 col-start-2 col-span-1">
        0
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('start')}
        class="row-start-5 row-span-1 col-start-1 col-span-3">
        Start
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('addThirty')}
        class="row-start-6 row-span-1 col-start-1 col-span-3">
        +30
    </PanelButton>

    <PanelButton
        on:press={() => dispatch('stop')}
        class="row-start-7 row-span-1 col-start-1 col-span-3">
        Stop
    </PanelButton>
</div>