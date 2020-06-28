/* eslint-disable camelcase */
/* eslint-disable arrow-parens */

import axios from 'axios'

export const state = () => ({
  /**
   * Массив содержащий метаинформацию по страницам.
   *
   * @example [{id: 1, page: 'watches', title: '...', keywords: '...', content: '...'}]
   */
  meta: [],
  /**
   * В данном массиве содержиться информация
   * ранее посещенных страниц (до 50).
   *
   * @example [{url: '/some/url', page_data: '{...}'}]
   */
  cache: [],
  /**
   * Данные фильтра.
   *
   * @example {sex: "мужские", mechanism: "кварцевый"}
   */
  filter_state: {},
  /**
   * Настройки фильтра на странице
   * со списком часов.
   *
   * @example {"countries":[{"country":"Швейцария"},{"country":"Китай"},{"country":"Англия"}]}
   */
  filter_settings: undefined,
  /**
   * Поисковые параметры.
   * Используются для пагинации страниц
   * и в фильтре данных.
   *
   * @example {foo: 1, bar: 2}
   */
  search_params: {},
  /**
   * Массив содержащий товары в корзине.
   *
   * Каждый элемент корзины представлен
   * в виде объекта вида { total: ...,  good: { ... }}
   * где total - общее количество определенного товара,
   * good - объект с описанием товара.
   */
  cart: []
})

export const getters = {
  /**
   * Проверяет наличие ранее сохраненной
   * информации в кеше.
   *
   * @param {string} url - url проверяемой страницы.
   * @returns {object}
   */
  in_cache: state => url => {
    const index = state.cache.findIndex(item => item.url === url)

    return {
      cached: index !== -1,
      index
    }
  },
  /**
   * Извлекает данные из кеша.
   *
   * @param {number} index - порядковый номер элемента в кеше.
   */
  get_from_cache: state => index => {
    return state.cache[index]
  }
}

export const mutations = {
  /**
   * Сохраняет метаданные сайта.
   */
  set_meta (state, meta) {
    state.meta = meta
  },
  /**
   * Сохраняет данные в кеше,
   * сокращая размер массива до 50 элементов
   * при необходимости.
   *
   * @param {object} data - данные для сохранения ({url: '...', data: page_data})
   */
  save_in_cache (state, data) {
    const cache = state.cache

    if (cache.length >= 50) {
      cache.shift()
    }

    state.cache.push(data)
  },
  /**
   * Сохраняет настройки фильтра
   * данных на странице со списком часов.
   *
   * @param {object} settings - объект содержащий настройки фильтра
   */
  save_filter_settings (state, settings) {
    state.filter_settings = settings
  },
  /**
   * Сохраняет состояние фильтра.
   *
   * @param {object} filter_state - объект содержащий состояние фильтра
   */
  save_filter_state (state, filter_state) {
    state.filter_state = filter_state
  },
  /**
   * Сохраняет поисковые параметры.
   *
   * @param {object} search_params - объект содержащий поисковые параметры
   */
  save_search_params (state, search_params) {
    state.search_params = search_params
  },
  /**
   * Сохраняет товар в хранилище.
   *
   * @param {object} good_data - объект содержащий данные по торвару.
   */
  add_to_cart (state, good_data) {
    // state.cart.push(good_data)

    const cart = state.cart

    // каждый элемент корзины представлен
    // в виде объекта вида { total: ...,  good: { ... }}
    // где total - общее количество определенного товара,
    // good - объект с описанием товара
    for (let i = 0; i < cart.length; i++) {
      const { good } = cart[i]

      // повторно добавляется тот же товар
      if (good && good.title === good_data.title) {
        cart[i].total += 1

        return
      }
    }

    // соответствий по товару не найдено,
    // добавим новый товар в корзину
    state.cart.push({ total: 1, good: good_data })
  }
}

export const actions = {
  /**
   * Запрашивает и возвращает метаданные сайта
   * до рендеринга страниц.
   */
  async nuxtServerInit ({ commit }) {
    try {
      const meta = await axios.get(`${process.env.baseUrl}/api/meta`).then(({ data }) => data)

      commit('set_meta', meta)
    } catch (e) {}

    try {
      const filter_settings = await axios.get(`${process.env.baseUrl}/filter/filter.json`).then(({ data }) => data)

      commit('save_filter_settings', filter_settings)
    } catch (e) {}
  }
}
