<script>
import Background from '../components/Background.svelte';
import Microwave from '../components/Microwave.svelte';
import Door from '../components/Door.svelte';
import Display from '../components/Display.svelte';
import Panel from '../components/Panel.svelte';
import OpenButton from '../components/OpenButton.svelte';

import machine from '../machine';
import { useMachine } from 'svelte-xstate';
import time from '../stores/time';
import { pad } from '../helpers';

let [state, send] = useMachine(machine);

function getDisplay(state, { digits, timer }) {
    if (state === 'idle') {
        if (digits === '') return $time;
        return formatDigits(digits);
    } else if (state === 'finished') {
        return 'DONE';
    } else /* heating or paused */ {
        return formatTimer(timer);
    }
}

function formatDigits(digits) {
    const padded = digits.padStart(4, '0');
    const firstPart = padded.slice(0, 2);
    const secondPart = padded.slice(2, 4);
    return `${firstPart}:${secondPart}`;
}

function formatTimer(timer) {
    const minutes = pad(Math.floor(timer / 60));
    const seconds = pad(timer % 60);
    return `${minutes}:${seconds}`;
}

$: display = getDisplay($state.value, $state.context)
</script>

<Background>
    <Microwave>
        <Door heating={$state.matches('heating')} />
        <Display value={display} />
        <Panel
            on:digit={event => send('DIGIT', { digit: event.detail })}
            on:start={event => send('START')}
            on:addThirty={() => send('ADD_THIRTY_SECS')}
            on:stop={() => send('STOP')} />
        <OpenButton on:press={() => send('DOOR_OPEN')} />
    </Microwave>
</Background>
