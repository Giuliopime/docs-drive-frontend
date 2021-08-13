module.exports = {
  mode: 'jit',
  purge: [

    './components/**/*.{vue,js}',

    './layouts/**/*.vue',

    './pages/**/*.vue',

    './plugins/**/*.{js,ts}',

    './nuxt.config.{js,ts}',

  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        accent: "#000000"
      },
      minWidth: {
        '1/4': '25%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
