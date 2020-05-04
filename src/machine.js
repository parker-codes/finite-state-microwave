import { Machine, assign } from 'xstate';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;

export default Machine(
  {
    id: 'microwave',

    initial: 'idle',

    context: {
      digits: '',
      timer: 0,
    },

    states: {
      idle: {
        entry: ['resetDigits', 'resetTimer'],

        on: {
          DIGIT: {
            actions: ['appendDigit'],
          },

          START: {
            cond: 'hasDigits',
            actions: ['setTimer'], // guaranteed to finish before target state is achieved
            target: 'heating',
          },

          STOP: {
            actions: ['beep'],
            target: 'idle', // reenters state, firing entry actions
          },

          ADD_THIRTY_SECS: {
            actions: ['add30SecondsToDigits'],
          },
        },
      },

      heating: {
        invoke: {
          id: 'tickInterval',
          src: (context, event) => (callback, onReceive) => {
            const interval = setInterval(() => callback('TICK'), 1000); // send TICK every second
            return () => clearInterval(interval); // cleanup
          },
        },

        on: {
          DOOR_OPEN: 'paused',

          STOP: {
            actions: ['beep'],
            target: 'paused',
          },

          ADD_THIRTY_SECS: {
            actions: ['add30SecondsToTimer'],
            // TODO: add a guard so that it can't go over 99:99
          },

          TICK: [
            {
              actions: 'decrementTimer',
              cond: 'timerIsAboutToFinish',
              target: 'finished',
            },
            {
              actions: 'decrementTimer',
            },
          ],
        },
      },

      paused: {
        on: {
          STOP: {
            actions: ['beep'],
            target: 'idle',
          },

          START: 'heating',
        },
      },

      finished: {
        entry: ['beep4Times'],

        activities: ['beepEveryMinute'],

        on: {
          DOOR_OPEN: 'idle',
          STOP: 'idle',
        },
      },
    },
  },
  {
    guards: {
      hasDigits: (context) => context.digits.length > 0,

      timerIsAboutToFinish: (context) => context.timer === 1,
    },

    actions: {
      decrementTimer: assign({
        timer: (context) => context.timer - 1,
      }),

      appendDigit: assign({
        digits: (context, event) => `${context.digits}${event.digit}`,
      }),

      add30SecondsToDigits: assign({
        digits: (context) => {
          if (context.digits === '') return '30';
          const digitsToNumber = parseInt(context.digits);
          const plus30 = digitsToNumber + 30;
          return `${plus30}`;
        },
      }),

      add30SecondsToTimer: assign({
        timer: (context) => {
          if (context.timer === null) return 30;
          return context.timer + 30;
        },
      }),

      // convert digits into timer before heating state
      setTimer: assign({
        timer: (context) => {
          // TODO: weird logic of turning something like 1:00 to 60 seconds
          return parseInt(context.digits);
        },
      }),

      resetDigits: assign({ digits: () => '' }),

      resetTimer: assign({ timer: 0 }),

      beep() {
        console.log('BEEP');
      },
    },

    activities: {
      beep4Times() {
        let count = 0;

        const intervalId = setInterval(() => {
          console.log('BEEP!');

          if (++count === 4) clearInterval(intervalId);
        }, ONE_SECOND);
      },

      beepEveryMinute() {
        const interval = setInterval(() => console.log('BEEP!'), ONE_MINUTE);
        return () => clearInterval(interval); // cleanup
      },
    },
  }
);
