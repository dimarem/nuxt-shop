<template>
  <section>
    <main>
      <div id="watches">
        <Article
          v-for="item in watches"
          :key="item.id"
          :content="item"
        />
      </div>
    </main>
    <Pagination
      v-if="pagination_required"
      :current_page="page_data.page"
      :number_of_pages="page_data.lastPage"
      base="/"
    />
  </section>
</template>

<script>
/* eslint-disable camelcase */
/* eslint-disable no-console */

import axios from 'axios'
import Article from '~/components/index/Article.vue'
import Pagination from '~/components/pagination/Pagination.vue'

export default {
  components: {
    /**
     * Формирует краткое описание товара
     * и ссылку на страницу с полным.
     */
    Article,
    /**
     * Компонент для пагинации.
     */
    Pagination
  },
  /**
   * Запрашивает данные текущей страницы.
   */
  asyncData ({ store, query, error, env: { baseUrl } }) {
    const page = query.page
    const url = `${baseUrl}/api/watches?page=${page || 1}`

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
      .then(({ data: { success, page_data } }) => {
        if (success) {
          // данные по указанной странице отсутствуют
          if (page_data.data.length === 0) {
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
  data () {
    return {
      /**
       * Объект вида {total: '', perPage: '', lastPage: '', page: '', data: [{...}]}, где
       * total - общее количество записей в БД,
       * perPage - количество записей на страницу,
       * lastPage - номер последней страницы,
       * page - номер текущей страницы,
       * data - массив, каждый элемент, которого представляет собой описание часов.
       */
      page_data: null
    }
  },
  computed: {
    /**
     * Возвращает массив содержащий
     * описание часов.
     *
     * @returns {array}
     * @example [{id: '', image: '', title: '', brand: '', price: ''}]
     */
    watches () {
      return this.page_data.data
    },
    /**
     * Вычисляет необходимость отображения
     * компонента пагинации страниц.
     */
    pagination_required () {
      try {
        return this.page_data.lastPage > 1
      } catch (e) {
        return false
      }
    }
  },
  watchQuery: true,
  /**
   * Формирует метаданные страницы.
   */
  head () {
    const meta = this.$store.state.meta

    const watches_page_meta = meta.length ? meta.find(item => item.page === 'watches') : {}

    const { page_title = 'WatchWise', page_description = '', page_keywords = '' } = watches_page_meta

    return {
      title: `${page_title}`,
      meta: [
        { hid: 'keywords', name: 'keywords', content: `${page_keywords}` },
        { hid: 'description', name: 'description', content: `${page_description}` },
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
#watches {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
  max-width: 1000px;
  min-height: 100vh;
  margin: auto;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  article {
    opacity: 0;
    transform: translateY(20px);

    &:nth-of-type(3n + 1) {
      animation: rise .5s forwards;
    }

    &:nth-of-type(3n + 2) {
      animation: rise .5s .15s forwards;
    }

    &:nth-of-type(3n + 3) {
      animation: rise .5s .3s forwards;
    }

    @media screen and (max-width: 800px) {
      &:nth-of-type(2n + 1) {
        animation: rise .5s forwards;
      }

      &:nth-of-type(2n + 2) {
        animation: rise .5s .15s forwards;
      }
    }

    @media screen and (max-width: 500px) {
      animation: show-up .5s forwards;
    }
  }

  @keyframes rise {
    0% {
      opacity: 0;
      transform: translateY(20px);
    } 100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
