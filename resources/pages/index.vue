<template>
  <section>
    <DataFilter
      :filter_state="filter_state"
      base="/"
    />
    <main>
      <div
        id="watches"
        :class="{padded: !pagination_required}"
      >
        <WatchLink
          v-for="item in watches"
          :key="item.id"
          :content="item"
        />
      </div>
      <div id="no-data">
        Данные по указанным критериям отсутствуют
      </div>
    </main>
    <Pagination
      v-if="pagination_required"
      :current_page="current_page"
      :number_of_pages="number_of_pages"
      :search="search_params"
      base="/"
    />
  </section>
</template>

<script>
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable curly */

import { mapState } from 'vuex'
import axios from 'axios'
import WatchLink from '~/components/watch-link/WatchLink.vue'
import Pagination from '~/components/pagination/Pagination.vue'
import DataFilter from '~/components/filter/DataFilter.vue'

export default {
  components: {
    /**
     * Формирует краткое описание товара
     * и ссылку на страницу с полным.
     */
    WatchLink,
    /**
     * Компонент для пагинации.
     */
    Pagination,
    /**
     * Компонент с опциями фильтрации данных.
     */
    DataFilter
  },
  /**
   * Запрашивает данные текущей страницы.
   */
  asyncData ({ store, query, error, env: { baseUrl } }) {
    const { page, sex, mechanism } = query
    const search_page = page ? `page=${page}` : 'page=1'
    const search_sex = sex ? `&sex=${encodeURIComponent(sex)}` : ''
    const search_mechanism = mechanism ? `&mechanism=${encodeURIComponent(mechanism)}` : ''
    const url = `${baseUrl}/api/watches?${search_page}${search_sex}${search_mechanism}`

    // обновим состояние фильтра данных,
    // чтобы оно соответствовало представленным
    // данным на странице
    const filter_state = {}

    if (sex) filter_state.sex = sex
    if (mechanism) filter_state.mechanism = mechanism

    store.commit('save_filter_state', filter_state)

    // проверим наличие данных в кеше
    // возможно страница уже посещалась ранее
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
    ...mapState(['filter_state', 'search_params']),
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
     * Текущая страница.
     *
     * @returns {string}
     */
    current_page () {
      return this.page_data.page
    },
    /**
     * Общее количество страниц.
     *
     * @returns {number}
     */
    number_of_pages () {
      return this.page_data.lastPage
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
  layout: 'watches',
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

  a {
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

.padded {
  padding-bottom: 6rem;
}
</style>
