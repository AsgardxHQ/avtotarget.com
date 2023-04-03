import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ['primevue']
  },
  runtimeConfig: {
    databaseUrl: process.env.NUXT_DATABASE_URL,
    cookieName: process.env.COOKIE_NAME || '__session',
    cookieSecret: process.env.COOKIE_SECRET || 'secret',
    cookieExpires: parseInt(process.env.COOKIE_REMEMBER_ME_EXPIRES || '1000 * 60 * 60 * 24', 10), // 1 day
    cookieRememberMeExpires: parseInt(process.env.COOKIE_REMEMBER_ME_EXPIRES || '1000 * 60 * 60 * 24 * 7', 10), // 7 days
  },
  buildModules: ['@pinia/nuxt'],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  css: [
      'primevue/resources/themes/saga-blue/theme.css',
      'primevue/resources/primevue.css',
      'primeicons/primeicons.css',
  ],
  tailwindcss: {
    // Options
  },
  serverMiddleware: [{ 
    path: '/',
    handler: './middleware/redirect'
  }]
})
