export default {
  initialIdleState:
    "{\nid: 'microwave', // what we call it\n\ninitial: 'idle', // initial state of the machine\n\n// data that we can manipulate or display\ncontext: {\ndigits: '',\ntimer: 0,\n},\n\nstates: {\n\n// the \"idle\" state\nidle: {\nentry: ['resetDigits', 'resetTimer'], // some functions to run when I enter this state\n\non: {\nPRESS_DIGIT: {\nactions: ['appendDigit'],\n},\n\nSTART: {\ncond: 'hasDigits',actions: ['setTimer'], // run the \"setTimer\" function which converts the digits (string) into the timer (number)\ntarget: 'heating', // then switch into the \"heating\" state!\n},\n\nSTOP: {\nactions: ['beep'],\ntarget: 'idle', // reenters this \"idle\" state, firing entry actions\n},\n\nADD_THIRTY_SECS: {\nactions: ['add30SecondsToDigits'],\n},\n},\n},\n\n\n// ... more states and events\n},\n},",

  simplePageStructure: '<Background>\n<Microwave>\n<Door />\n<Display />\n<Panel />\n<OpenButton />\n</Microwave>\n</Background>',

  microwaveComponent: '<div id="microwave" class="bg-gray-900 rounded-lg absolute right-1/6 lg:static mt-8 md:mt-16 lg:mr-8 w-240 h-128 p-4 grid grid-cols-5 grid-rows-6 gap-4">\n<slot />\n</div>',

  finalPageStructure:
    "<script>\n// ... import components\n\nimport machine from '../machine';\nimport { useMachine } from 'xstate-svelte';\nimport time from '../stores/time';\nimport { formatDigits, formatTimer } from '../helpers';\n\nlet { state, send } = useMachine(machine); // here's where we get our machine store!\n\nexport function getDisplay(state, { digits, timer }) {\nif (state === 'idle') {\nif (digits === '') return $time;\nreturn formatDigits(digits);\n} else if (state === 'finished') {\nreturn 'DONE';\n} /* heating or paused */ else {\nreturn formatTimer(timer);\n}\n}\n\n$: display = getDisplay($state.value, $state.context)\n</script>\n\n<Background>\n<Microwave>\n<Door heating={$state.matches('heating')} />\n<Display value={display} />\n<Panel\n on:digit={event => send(`PRESS_${event.detail}`)}\non:start={event => send('START')}\non:addThirty={() => send('ADD_THIRTY_SECS')}\non:stop={() => send('STOP')} />\n<OpenButton on:press={() => send('DOOR_OPEN')} />\n</Microwave>\n</Background>",
};
