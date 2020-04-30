import { Machine, assign } from 'xstate';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;

export default Machine(
  {
    id: 'microwave',

    initial: 'idle',

    context: {
      digits: '',
      timer: null,
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

          THIRTY_SECS: {
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

          THIRTY_SECS: {
            actions: ['add30SecondsToTimer'],
          },

          TICK: [
            {
              actions: 'decrementTimer',
              cond: 'isTimerAboutToFinish',
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

      isTimerAboutToFinish: (context) => context.timer === 1,
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
      setTimer: assign({ timer: (context) => parseInt(context.digits) }),

      resetDigits: assign({ digits: () => '' }),

      resetTimer: assign({ timer: () => null }),

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
