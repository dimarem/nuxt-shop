<template>
  <section>
    <main class="watches-list">
      <template v-if="watches.length">
        <transition name="articles" mode="out-in">
          <div
            :key="Date.now()"
            class="articles"
          >
            <Article
              v-for="item in watches"
              :key="item.id"
              :content="item"
            />
          </div>
        </transition>
      </template>
      <template v-else>
        <p class="empty">
          Данные отсутствуют
        </p>
      </template>
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

import anime from 'animejs/lib/anime.es.js'
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
      .then(({ data }) => {
        const { success, page_data } = data

        if (success) {
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
      if (this.page_data) {
        return this.page_data.data
      } else {
        return []
      }
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
  beforeRouteUpdate (to, from, next) {
    if (document.documentElement.scrollTop !== 0) {
      this.scroll_to_top(next)
    } else {
      next()
    }
  },
  methods: {
    /**
     * Прокручивает страницу к началу.
     *
     * @param {function} next - функция-финализатор
     */
    scroll_to_top (next) {
      anime({
        targets: document.documentElement,
        scrollTop: 0,
        easing: 'easeOutExpo',
        duration: 500,
        complete: next
      })
    }
  },
  watchQuery: true,
  scrollToTop: false,
  /**
   * Формирует метаданные страницы.
   */
  head () {
    const meta = this.$store.state.meta

    const watches_page_meta = meta.length ? meta.find(item => item.page === 'watches') : {}

    const { page_title = '', page_description = '', page_keywords = '' } = watches_page_meta

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
.watches-list {
  position: relative;
  min-height: 100vh;

  .articles {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    min-height: 100vh;
    margin: auto;
  }

  .articles-enter, .articles-leave-to {
    opacity: 0;
  }

  .articles-enter-active, .articles-leave-active {
    transition: .25s;
  }

  .empty {
    position: absolute;
    left: 50%;
    top: 50%;
    max-width: 300px;
    transform: translate(-50%, -50%);
  }
}
</style>
