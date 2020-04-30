<script>
import Background from '../components/Background.svelte';
import Microwave from '../components/Microwave.svelte';
import Door from '../components/Door.svelte';
import Display from '../components/Display.svelte';
import Panel from '../components/Panel.svelte';
import OpenButton from '../components/OpenButton.svelte';

import machine from '../machine';
import { useMachine } from 'svelte-xstate';

let [state, send] = useMachine(machine);

function getDisplay(state, { digits, timer }) {
    if (state === 'finished') return 'DONE';
    else if (state === 'idle') {
        return '--:--';
        // return `${firstPart}:${secondPart}`;
    } else /* heating or paused */ {
        return '00:00';
    }
}

$: display = getDisplay($state.value, $state.context)
</script>

<Background>
    <h2>{$state.value}</h2>
    <Microwave>
        <Door heating={$state.matches('heating')} />
        <Display value={display} />
        <Panel
            on:digit={event => send('DIGIT', event.detail)}
            on:start={event => send('START')}
            on:addThirty={() => send('THIRTY_SECS')}
            on:stop={() => send('STOP')} />
        <OpenButton on:press={() => send('DOOR_OPEN')} />
    </Microwave>
</Background>
