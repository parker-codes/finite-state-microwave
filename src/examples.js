export default {
  initialIdleState: `{
    // what we call it
    id: 'microwave',

    // initial state of the machine
    initial: 'idle',

    // data that we can manipulate or display
    context: {
      digits: '',
      timer: 0,
    },

    states: {
      // the "idle" state
      idle: {
        // some functions to run when I enter this state
        entry: ['resetDigits', 'resetTimer'],

        on: {
          PRESS_DIGIT: {
            actions: ['appendDigit'],
          },

          START: {
            cond: 'hasDigits',
            // run the "setTimer" function which converts
            // the digits (string) into the timer (number)
            actions: ['setTimer'],
            // then switch into the "heating" state!
            target: 'heating',
          },

          STOP: {
            actions: ['beep'],
            // reenters this "idle" state, firing entry actions
            target: 'idle',
          },

          ADD_THIRTY_SECS: {
            actions: ['add30SecondsToDigits'],
          },
        },
      },

      // ... more states and events
    },
  }`,

  simplePageStructure: `<Background>
  <Microwave>
    <Door />
    <Display />
    <Panel />
    <OpenButton />
  </Microwave>
</Background>`,

  microwaveComponent: `<div id="microwave" class="bg-gray-900 rounded-lg absolute right-1/6 lg:static mt-8 md:mt-16 lg:mr-8 w-240 h-128 p-4 grid grid-cols-5 grid-rows-6 gap-4">
  <slot />
</div>`,

  finalPageStructure: `<script>
  // ... import components

  import machine from '../machine';
  import { useMachine } from 'xstate-svelte';
  import time from '../stores/time';
  import { formatDigits, formatTimer } from '../helpers';

  // here's where we get our machine store!
  let { state, send } = useMachine(machine);

  function getDisplay(state, { digits, timer }) {
      if (state === 'idle') {
          if (digits === '') return $time;
          return formatDigits(digits);
      } else if (state === 'finished') {
          return 'DONE';
      } /* heating or paused */ else {
          return formatTimer(timer);
      }
  }

  $: display = getDisplay($state.value, $state.context);
</script>

<Background>
  <Microwave>
    <Door heating={$state.matches('heating')} />

    <Display value={display} />

    <Panel
              on:digit={event => send(\`PRESS_\${event.detail}\`)}
              on:start={event => send('START')}
              on:addThirty={() => send('ADD_THIRTY_SECS')}
              on:stop={() => send('STOP')}
          />

    <OpenButton on:press={() => send('DOOR_OPEN')} />
  </Microwave>
</Background>`,
};
