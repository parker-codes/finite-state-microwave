module.exports = {
  purge: ['./src/**/*.html', './src/**/*.svelte'],
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '136': '34rem',
        '144': '36rem',
        '152': '38rem',
        '240': '60rem',
      },
    },
  },
  variants: {
    margin: ['responsive', 'first', 'hover', 'focus'],
  },
  plugins: [],
};
