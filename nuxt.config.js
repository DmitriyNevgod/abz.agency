export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TESTTASK',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/index.scss'],

  // Tailwindcss config
  tailwindcss: {
    exposeConfig: false,
    viewer: true,
    config: {
      theme: {
        container: {
          padding: {
            DEFAULT: '16px',
            sm: '16px',
            lg: '32px',
            xl: '60px',
            '2xl': '120px',
          },
        },
        colors: {
          black: 'hsla(0, 0%, 0%, 0.87)',
          primary: {
            100: '#F4E041',
            200: '#FFE302',
          },
          secondary: '#00BDD3',
          background: '#F8F8F8',
          danger: '#CB3D40',
          white: '#FFFFFF',
          grey: {
            100: '#D0CFCF',
            200: '#B4B4B4',
            300: '#7E7E7E',
          },
        },
        fontFamily: {
          sans: ['Nunito', 'sans-serif'],
        },
        fontSize: {
          base: ['16px', '26px'],
          title: ['40px', '40px'],
        },
      },
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/tippy.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', '~/components/main/', '~/components/base/'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: true,
  },
}
