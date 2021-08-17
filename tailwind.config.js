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
        accent: "#000000",
        primary: "#002356",
        secondary: "#c81420"
      },
      minWidth: {
        '100%': '1.8rem',
        '1/10': '2rem',
        '1/5': '20%',
      },
      stroke: {
        "primary": "#002356",
        "secondary": "#c81420"
      }
    },
  },
  variants: {
    extend: {
      opacity: ['hover'],
      stroke: ['hover'],
    }
  },
  plugins: [],
}
