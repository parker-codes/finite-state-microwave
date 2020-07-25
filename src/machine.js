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
          PRESS_1: {
            actions: ['append1ToDigits'],
          },

          PRESS_2: {
            actions: ['append2ToDigits'],
          },

          PRESS_3: {
            actions: ['append3ToDigits'],
          },

          PRESS_4: {
            actions: ['append4ToDigits'],
          },

          PRESS_5: {
            actions: ['append5ToDigits'],
          },

          PRESS_6: {
            actions: ['append6ToDigits'],
          },

          PRESS_7: {
            actions: ['append7ToDigits'],
          },

          PRESS_8: {
            actions: ['append8ToDigits'],
          },

          PRESS_9: {
            actions: ['append9ToDigits'],
          },

          PRESS_0: {
            cond: 'hasDigits',
            actions: ['append0ToDigits'],
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

          ADD_THIRTY_SECS: [
            {
              cond: 'hasDigits',
              actions: ['add30SecondsToDigits'],
            },
            {
              actions: ['add30SecondsToDigits', 'setTimer'],
              target: 'heating',
            },
          ],
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
          },

          TICK: [
            {
              cond: 'timerIsAboutToFinish',
              actions: 'decrementTimer',
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
      append1ToDigits: assign({
        digits: (context) => `${context.digits}1`,
      }),

      append2ToDigits: assign({
        digits: (context) => `${context.digits}2`,
      }),

      append3ToDigits: assign({
        digits: (context) => `${context.digits}3`,
      }),

      append4ToDigits: assign({
        digits: (context) => `${context.digits}4`,
      }),

      append5ToDigits: assign({
        digits: (context) => `${context.digits}5`,
      }),

      append6ToDigits: assign({
        digits: (context) => `${context.digits}6`,
      }),

      append7ToDigits: assign({
        digits: (context) => `${context.digits}7`,
      }),

      append8ToDigits: assign({
        digits: (context) => `${context.digits}8`,
      }),

      append9ToDigits: assign({
        digits: (context) => `${context.digits}9`,
      }),

      append0ToDigits: assign({
        digits: (context) => `${context.digits}0`,
      }),

      decrementTimer: assign({
        timer: (context) => context.timer - 1,
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
          if (context.timer > 6009) return 6039; // limit to 99:99
          return context.timer + 30;
        },
      }),

      // convert digits into timer before heating state
      setTimer: assign({
        timer: (context) => {
          const padded = context.digits.padStart(4, '0');
          const minutes = parseInt(padded.slice(0, 2));
          const seconds = parseInt(padded.slice(2, 4));
          return minutes * 60 + seconds;
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
