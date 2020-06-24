<template>
  <section>
    <main>
      <Article :page_data="page_data" />
    </main>
  </section>
</template>

<script>
/* eslint-disable camelcase */
/* eslint-disable no-console */

import axios from 'axios'
import Article from '~/components/description/Article.vue'

export default {
  components: {
    Article
  },
  /**
   * Запрашивает данные текущей страницы.
   */
  asyncData ({ store, params, error, env: { baseUrl } }) {
    const url = `${baseUrl}/api/description/${params.id}`

    // проверим наличие данных в кеше
    const { cached, index } = store.getters.in_cache(url)

    // данные по этой странице уже были получены ранее
    // вернем их
    if (cached) {
      const { page_data } = store.getters.get_from_cache(index)

      return { page_data }
    }

    // данные отсутствуют в кеше
    return axios
      .get(url)
      .then(({ data: { success, page_data: [page_data] } }) => {
        if (success) {
          // проверим наличие данных
          if (Object.keys(page_data).length === 0) {
            error({ statusCode: 404, message: 'Страница не найдена' })
          }

          // сохраним данные в кеше
          store.commit('save_in_cache', { url, page_data })

          return { page_data }
        } else {
          error({ statusCode: 500, message: 'Сервис временно недоступен' })
        }
      })
      .catch((e) => {
        error({ statusCode: 500, message: 'Сервис временно недоступен' })
      })
  },
  layout: 'watches',
  watchQuery: true,
  /**
   * Формирует метаданные страницы.
   */
  head () {
    return {
      title: `Купить наручные часы | ${this.page_data.title}`,
      meta: [
        { hid: 'keywords', name: 'keywords', content: '...' },
        { hid: 'description', name: 'description', content: '...' },
        { hid: 'og:title', property: 'og:title', content: 'Купить наручные часы' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:site_name', property: 'og:site_name', content: `${process.env.siteName}` },
        { hid: 'og:url', property: 'og:url', content: `${process.env.baseUrl}${this.$route.path}` },
        { hid: 'og:image', property: 'og:image', content: `${process.env.baseUrl}/images/og/nuxt.png` }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
