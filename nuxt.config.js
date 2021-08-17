require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    titleTemplate: '%sDocumenti - Docali&Dona Intermediazioni Assicurative',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'noodp,noydir' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:description', property: 'og:description', content: 'Utilizza il portale documenti per visualizzare e scaricare tutti i tuoi file.' },
      { name: 'author', content: 'Giulio Pimenoff Verdolin (https://giuliopime.dev) e Luca Damaschetti' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Documenti - Docali&Dona Intermediazioni Assicurative' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/utils',
    { src: '~/plugins/aos', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  router: {
    middleware: ['auth']
  },

  auth: {
    strategies: {
      cookie: {
        scheme: '~/schemes/customScheme',
        cookie: {
          name: 'session_id',
        },
        token: {
          required: false,
          type: false
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: {
            url: `${process.env.API_BASE_URL}/login`,
            method: 'post'
          },
          logout: {
            url: `${process.env.API_BASE_URL}/logout`,
            method: 'get'
          },
          user: {
            url: `${process.env.API_BASE_URL}/user`,
            method: 'get'
          }
        }
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      name: 'Documenti - Docali assicurazioni',
      lang: 'it'
    },
    manifest: {
      lang: 'it',
      name: 'Documenti - Docali assicurazioni',
      shortcuts: [
        {
          name: "Miei documenti",
          short_name: "Documenti",
          description: "Visualizza tutti i tuoi documenti.",
          url: "/profilo",
        }
      ]
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
