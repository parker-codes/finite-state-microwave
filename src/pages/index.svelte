<script>
import Background from '../components/machine/Background.svelte';
import Microwave from '../components/machine/Microwave.svelte';
import Door from '../components/machine/Door.svelte';
import Display from '../components/machine/Display.svelte';
import Panel from '../components/machine/Panel.svelte';
import OpenButton from '../components/machine/OpenButton.svelte';

import machine from '../machine';
import { useMachine } from 'xstate-svelte';
import time from '../stores/time';
import { formatDigits, formatTimer } from '../helpers';

let { state, send } = useMachine(machine);

export function getDisplay(state, { digits, timer }) {
  if (state === 'idle') {
    if (digits === '') return $time;
    return formatDigits(digits);
  } else if (state === 'finished') {
    return 'DONE';
  } /* heating or paused */ else {
    return formatTimer(timer);
  }
}

$: display = getDisplay($state.value, $state.context)
</script>

<Background>
    <Microwave>
        <Door heating={$state.matches('heating')} />
        <Display value={display} />
        <Panel
            on:digit={event => send(`PRESS_${event.detail}`)}
            on:start={event => send('START')}
            on:addThirty={() => send('ADD_THIRTY_SECS')}
            on:stop={() => send('STOP')} />
        <OpenButton on:press={() => send('DOOR_OPEN')} />
    </Microwave>
</Background>
