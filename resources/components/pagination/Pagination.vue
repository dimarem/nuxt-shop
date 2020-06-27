<template>
  <div :class="{'nuxt-pagination': use_default_css}">
    <button
      v-if="buttons_required"
      :class="{'nuxt-pagination-button': use_default_css}"
      @click="show_previous_links"
    >
      <BackSVG :class="{ inactive: left_button_inactive }" />
    </button>
    <div :class="{'nuxt-pagination-links': use_default_css}">
      <nuxt-link
        v-for="route in routes"
        :key="route.url"
        :to="route.url"
        :class="{'nuxt-pagination-link': use_default_css}"
      >
        {{ route.index }}
      </nuxt-link>
    </div>
    <button
      v-if="buttons_required"
      :class="{'nuxt-pagination-button': use_default_css}"
      @click="show_next_links"
    >
      <ForthSVG :class="{ inactive: right_button_inactive }" />
    </button>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/prop-name-casing */
/* eslint-disable no-console */
/* eslint-disable camelcase */

import BackSVG from './components/BackSVG.vue'
import ForthSVG from './components/ForthSVG.vue'

export default {
  components: {
    BackSVG,
    ForthSVG
  },
  props: {
    /**
     * Порядковый номер текущей страницы.
     *
     * @example :current_page="1"
     */
    current_page: {
      type: [Number, String],
      required: false,
      default: 1
    },
    /**
     * Общее количество страниц.
     *
     * @example :number_of_pages="25"
     */
    number_of_pages: {
      type: Number,
      required: true
    },
    /**
     * Базовый url.
     *
     * @example base="/example"
     */
    base: {
      type: String,
      required: true
    },
    /**
     * Объект содержащий поисковые параметры.
     *
     * @example :search="{ param_1: value, param_2: value }"
     */
    search: {
      type: Object,
      required: false
    },
    /**
     * Максимальное количество
     * отображаемых ссылок.
     *
     * @example :max_links="5"
     */
    max_links: {
      type: Number,
      required: false,
      default: 10
    },
    /**
     * Индикатор необходимости использования
     * css-стилей по умолчанию.
     * Можно выставить в false, чтобы исрользовать свои стили.
     *
     * @example :use_default_css="false"
     */
    use_default_css: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      /**
       * Порядковый номер страницы, в соответствии с которой
       * будет произведена первоначальная отрисовка компонента.
       */
      start_index: parseInt(this.current_page) || 1,
      /**
       * Массив содержащий маршруты отображаемые в текущий момент.
       * Заполняется в хуке "created".
       */
      routes: []
    }
  },
  computed: {
    /**
     * Возвращает строку содержащую
     * поисковые параметры.
     *
     * @returns {string}
     */
    search_params () {
      let search_params = ''
      let b = false

      try {
        for (const [key, value] of Object.entries(this.search)) {
          if (b) {
            search_params += `&${key}=${encodeURIComponent(value)}`
          } else {
            search_params += `${key}=${encodeURIComponent(value)}`

            b = true
          }
        }
      } catch (e) {}

      return search_params
    },
    /**
     * Вычисляет необходимость
     * отображения кнопок.
     *
     * @returns {boolean}
     */
    buttons_required () {
      return this.max_links < this.number_of_pages
    },
    /**
     * Индикатор активности левой кнопки.
     *
     * @returns {boolean}
     */
    left_button_inactive () {
      return this.routes[0].index === 1
    },
    /**
     * Индикатор активности правой кнопки.
     *
     * @returns {boolean}
     */
    right_button_inactive () {
      return this.routes[this.routes.length - 1].index === this.number_of_pages
    }
  },
  created () {
    this.routes = this.get_routes()
  },
  methods: {
    /**
     * Формирует перечень маршрутов
     * для первоначальной отрисовки компонента.
     *
     * @returns {array}
     * @example [{url: '...', index: '...'}]
     */
    get_routes () {
      const routes = []

      if (this.number_of_pages <= this.max_links) {
        for (let i = 1; i <= this.number_of_pages; i++) {
          const route = i === 1 ? this.create_route() : this.create_route(i)

          routes.push(route)
        }
      } else if (this.start_index === 1) {
        for (let i = 1; i <= this.max_links; i++) {
          const route = i === 1 ? this.create_route() : this.create_route(i)

          routes.push(route)
        }
      } else if ((this.start_index + (this.max_links - 1)) < this.number_of_pages) {
        for (let i = this.start_index; i <= (this.start_index + (this.max_links - 1)); i++) {
          const route = this.create_route(i)

          routes.push(route)
        }
      } else {
        for (let i = this.number_of_pages - this.max_links + 1; i <= this.number_of_pages; i++) {
          const route = this.create_route(i)

          routes.push(route)
        }
      }

      return routes
    },
    /**
     * Создает и возвращает маршрут.
     *
     * @param {number} index - порядковый номер маршрута (необязательный).
     * @returns {object}
     * @example {url: '...', index: '...'}
     */
    create_route (index) {
      const base = this.base
      const search_params = this.search_params

      if (index) {
        return { url: `${base}?page=${index}${search_params ? '&' + search_params : ''}`, index }
      } else {
        return { url: `${base}${search_params ? '?' + search_params : ''}`, index: 1 }
      }
    },
    /**
     * Отображает предыдущие ссылки.
     */
    show_previous_links () {
      if (!this.left_button_inactive) {
        if ((this.start_index - this.max_links) > 0) {
          this.start_index = this.start_index - this.max_links

          this.routes = this.get_routes()
        } else {
          this.start_index = 1

          this.routes = this.get_routes()
        }
      }
    },
    /**
     * Отображает следующие ссылки.
     */
    show_next_links () {
      if (!this.right_button_inactive) {
        const end_index = this.routes[this.routes.length - 1].index

        if ((end_index + this.max_links) < this.number_of_pages) {
          this.start_index = end_index + 1

          this.routes = this.get_routes()
        } else {
          this.start_index += this.number_of_pages - end_index

          this.routes = this.get_routes()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nuxt-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;

  .nuxt-pagination-links {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
  }

  .nuxt-pagination-link,
  .nuxt-pagination-button {
    flex-shrink: 0;
  }

  .nuxt-pagination-link {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 2.5rem;
    height: 2.5rem;
    margin: .25rem;
    color: inherit;
    font-size: .9375rem;
    font-family: $numeric;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;

    &:not(.nuxt-link-exact-active):hover {
      background-color: rgb(245, 245, 245);
    }
  }

  .nuxt-pagination-button {
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;

    &:first-of-type {
      margin-right: .5rem;
    }

    &:last-of-type {
      margin-left: .5rem;
    }
  }

  svg {
    width: .8rem;
    height: .8rem;
    transition: .3s;
  }

  .inactive {
    opacity: .2;
  }

  .nuxt-link-exact-active {
    background-color: rgb(225, 225, 225);
  }
}
</style>
