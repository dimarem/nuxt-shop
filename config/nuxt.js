const { resolve } = require('path')

module.exports = {
  mode: 'universal',
  dev: process.env.NODE_ENV === 'development',
  srcDir: resolve(__dirname, '..', 'resources'),
  /**
   * Заголовки страницы.
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    htmlAttrs: {
      lang: 'ru'
    }
  },
  /**
   * Progress-bar color.
   */
  loading: { color: '#fff' },
  /**
   * Файлы с глобальными стилями.
   */
  css: [
    '~assets/main.scss'
  ],
  /**
   * Nuxt.js dev-modules.
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  /**
   * Файлы с scss-переменными.
   */
  styleResources: {
    scss: ['./assets/_variables.scss']
  },
  /*
  ** Build configuration
  */
  build: {
    /**
     * Извлекать css-стили в отдельные файлы в production.
     */
    extractCSS: process.env.NODE_ENV === 'production'
  },
  /**
   * https://cli.vuejs.org/ru/guide/browser-compatibility.html#modern-mode
   */
  modern: process.env.NODE_ENV === 'production',
  /**
   * Переменные окружения.
   */
  env: {
    baseUrl: 'http://127.0.0.1:3000',
    siteName: 'WatchWise'
  }
}
